import Button from "@/components/Button";
import ChipGroup from "@/components/ChipGroup";
import TextButton from "@/components/TextButton";
import { useTheme } from "@/hooks";
import useMovieGenreList from "@/hooks/services/useMovieGenreList";
import { SPACING } from "@/utils/constants/spacing";
import { TYPOGRAPHY } from "@/utils/constants/typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  const { colors } = useTheme();
  const { data } = useMovieGenreList();
  const [selectedSort, setSelectedSort] = useState<number[]>([]);
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<number[]>([]);
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
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <TextButton text={"Cancel"} />
        <View style={{ flexDirection: "row", gap: 4 }}>
          <TextButton text={"Clear"} />
          <TextButton text={"Confirm"} />
        </View>
      </View>
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
});
