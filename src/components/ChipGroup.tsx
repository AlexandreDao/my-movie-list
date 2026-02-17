import { SPACING } from "@/utils/constants/spacing";
import React, { Dispatch, FC, SetStateAction } from "react";
import { ScrollView, StyleProp, ViewStyle } from "react-native";
import Chip from "./Chip";

type ChipGroupData = { text: string; id: number }[];

type ChipGroupProps = {
  data: ChipGroupData;
  multiple?: boolean;
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
  style?: StyleProp<ViewStyle>;
};

const ChipGroup: FC<ChipGroupProps> = ({
  data,
  multiple,
  selected,
  setSelected,
  style,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={{
        paddingHorizontal: SPACING.horizontal.md,
        gap: SPACING.vertical.sm,
      }}
    >
      {data.map(({ text, id }) => (
        <Chip
          key={`chip-${id}-${text}`}
          text={text}
          isSelected={selected.includes(id)}
          onPress={() =>
            setSelected((prev) => {
              if (multiple) {
                if (prev.includes(id)) {
                  return prev.filter((item) => item !== id);
                }
                return [...prev, id];
              } else {
                if (prev[0] === id) {
                  return [];
                }
                return [id];
              }
            })
          }
        />
      ))}
    </ScrollView>
  );
};

export default ChipGroup;
