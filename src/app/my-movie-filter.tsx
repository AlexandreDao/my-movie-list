import Button from "@/components/Button";
import ChipGroup from "@/components/ChipGroup";
import DateTimeSpinner from "@/components/DateTimeSpinner";
import TextButton from "@/components/TextButton";
import { useTheme } from "@/hooks";
import useMovieGenreList from "@/hooks/services/useMovieGenreList";
import { SPACING } from "@/utils/constants/spacing";
import { TYPOGRAPHY } from "@/utils/constants/typography";
import { FilterParam } from "@/utils/types/routeType";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { startOfDay } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// TODO: when scrolling afficher un alphabet qui permet de skip a une lettre ?

const SORT_ARRAY = [
  { text: "Alphabetic", id: 1 },
  { text: "Popular", id: 2 },
  { text: "Rating", id: 3 },
];

const MyMovieFilter: FC = () => {
  const {
    sort = "",
    filter = "",
    date: dateParam = "",
    dateFilter: dateFilterParam = "",
  } = useLocalSearchParams<FilterParam>();
  const { colors } = useTheme();
  const { data } = useMovieGenreList();
  const [selectedSort, setSelectedSort] = useState<number[]>(
    sort ? [parseInt(sort)] : [],
  );
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<number[]>(
    filter ? filter.split(",").map((elem) => parseInt(elem)) : [],
  );
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [date, setDate] = useState(new Date(dateParam || 0));
  const [dateFilter, setDateFilter] = useState<"before" | "after" | null>(
    dateFilterParam || null,
  );
  const [isBeforeOrAfter, setIsBeforeOrAfter] = useState<
    "before" | "after" | null
  >(null);
  const router = useRouter();

  return (
    <SafeAreaView
      collapsable={false}
      style={[
        styles.root,
        {
          backgroundColor: colors.backgroundSecondary,
        },
      ]}
      edges={["bottom"]}
    >
      <View
        style={[
          styles.handle,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
        <Text
          style={[
            TYPOGRAPHY.heading3,
            styles.heading3,
            { color: colors.textPrimary },
          ]}
        >
          Sort by
        </Text>
        <ChipGroup
          data={SORT_ARRAY}
          selected={selectedSort}
          setSelected={setSelectedSort}
        />
      </View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
        <Text
          style={[
            TYPOGRAPHY.heading3,
            styles.heading3,
            { color: colors.textPrimary },
          ]}
        >
          Filter by
        </Text>
        <ChipGroup
          multiple
          selected={selectedGenreFilter}
          setSelected={setSelectedGenreFilter}
          data={data?.map(({ name, id }) => ({ text: name, id: id })) || []}
        />
      </View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
        <Text
          style={[
            TYPOGRAPHY.heading3,
            styles.heading3,
            { color: colors.textPrimary },
          ]}
        >
          Released
        </Text>
        <Button
          variant="tertiary"
          text="Before a date"
          iconName="sort-calendar-ascending"
          style={styles.button}
          icon={MaterialCommunityIcons}
          onPress={() => {
            setIsBeforeOrAfter("before");
            setIsDatePickerVisible(true);
          }}
        />
        <View
          style={[
            styles.divider,
            {
              backgroundColor: colors.chipBackground,
            },
          ]}
        />
        <Button
          variant="tertiary"
          text="After a date"
          iconName="sort-calendar-descending"
          style={styles.button}
          icon={MaterialCommunityIcons}
          onPress={() => {
            setIsBeforeOrAfter("after");
            setIsDatePickerVisible(true);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TextButton
          text={"Cancel"}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            }
          }}
        />
        <View style={styles.actionButtonContainer}>
          <TextButton
            text={"Clear"}
            onPress={() => {
              setIsBeforeOrAfter(null);
              setDateFilter(null);
              setDate(new Date());
              setSelectedSort([]);
              setSelectedGenreFilter([]);
            }}
          />
          <TextButton
            text={"Confirm"}
            onPress={() => {
              if (router.canDismiss()) {
                router.dismissTo({
                  pathname: "/(tabs)/my-movie",
                  params: {
                    sort: selectedSort[0],
                    filter: selectedGenreFilter.join(","),
                    dateFilter: dateFilter,
                    date: dateFilter ? date.toISOString() : "",
                  },
                });
              }
            }}
          />
        </View>
      </View>
      <DateTimeSpinner
        isVisible={isDatePickerVisible}
        value={dateFilter === isBeforeOrAfter ? date : new Date()}
        onChange={(date) => {
          setDateFilter(isBeforeOrAfter);
          setIsBeforeOrAfter(null);
          setDate(startOfDay(date!));
        }}
        onDismiss={() => setIsDatePickerVisible(false)}
      />
    </SafeAreaView>
  );
};

export default MyMovieFilter;

const styles = StyleSheet.create({
  root: {
    paddingTop: SPACING.vertical.sm,
    paddingBottom: SPACING.vertical.xxl,
    rowGap: SPACING.vertical.md,
  },
  handle: {
    width: "25%",
    height: 4,
    borderRadius: 4,
    alignSelf: "center",
  },
  container: {
    paddingVertical: SPACING.vertical.sm,
    marginHorizontal: SPACING.horizontal.md,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    justifyContent: "flex-start",
  },
  heading3: {
    marginLeft: SPACING.horizontal.md,
    marginBottom: SPACING.vertical.xs,
  },
  divider: {
    height: 1,
    width: "60%",
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  actionButtonContainer: {
    flexDirection: "row",
    gap: 4,
  },
});
