import { useTheme } from "@/hooks";
import { FC, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextLayoutEvent,
  View,
  ViewStyle,
} from "react-native";

type CollapsableOverviewProps = {
  text?: string;
  style?: ViewStyle;
};

const useIsTruncated = (maxLines: number) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [measured, setMeasured] = useState(false);

  const onTextLayout = (e: TextLayoutEvent) => {
    if (measured) return;
    setIsTruncated(e.nativeEvent.lines.length > maxLines);
    setMeasured(true);
  };

  return { isTruncated, onTextLayout };
};

const CollapsableOverview: FC<CollapsableOverviewProps> = ({ text, style }) => {
  const [isOverviewFull, setIsOverviewFull] = useState(false);
  const { isTruncated, onTextLayout } = useIsTruncated(4);
  const { colors } = useTheme();

  return (
    <View style={style}>
      <Text
        style={[
          styles.overview,
          { color: colors.textPrimary, position: "absolute", opacity: 0 },
        ]}
        onTextLayout={onTextLayout}
      >
        {text}
      </Text>
      <Text
        numberOfLines={isOverviewFull ? 0 : 4}
        style={[styles.overview, { color: colors.textPrimary }]}
      >
        {text}
      </Text>
      {isTruncated && (
        <Pressable onPress={() => setIsOverviewFull(!isOverviewFull)}>
          <Text style={[styles.showText, { color: colors.hyperlink }]}>
            {isOverviewFull ? "Show less" : "Show more"}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overview: {
    lineHeight: 20,
    marginTop: 10,
    fontSize: 16,
  },
  showText: {
    textDecorationLine: "underline",
    fontSize: 20,
  },
});

export default CollapsableOverview;
