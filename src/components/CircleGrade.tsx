import { useTheme } from "@/hooks";
import { FC } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type CircleGradeProps = {
  grade: number | undefined;
  style?: ViewStyle;
};

const CircleGrade: FC<CircleGradeProps> = ({ grade, style }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.mainContainer, { backgroundColor: colors.grade }, style]}
    >
      <Text style={[styles.text, { color: colors.textPrimary }]}>
        {grade?.toFixed(1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 140,
    height: 145,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 40,
  },
});

export default CircleGrade;
