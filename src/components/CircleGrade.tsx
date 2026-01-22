import { FC } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type CircleGradeProps = {
  grade: number | undefined;
  style?: ViewStyle;
};

const CircleGrade: FC<CircleGradeProps> = ({ grade, style }) => {
  return (
    <View style={[styles.mainContainer, style]}>
      <Text style={styles.text}>{grade?.toFixed(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 140,
    height: 145,
    backgroundColor: "#9c1b94",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
  },
});

export default CircleGrade;
