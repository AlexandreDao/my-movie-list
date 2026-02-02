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

  return (
    <View style={style}>
      <Text
        style={[styles.overview, { position: "absolute", opacity: 0 }]}
        onTextLayout={onTextLayout}
      >
        {text}
      </Text>
      <Text numberOfLines={isOverviewFull ? 0 : 4} style={styles.overview}>
        {text}
      </Text>
      {isTruncated && (
        <Pressable onPress={() => setIsOverviewFull(!isOverviewFull)}>
          <Text style={styles.showText}>
            {isOverviewFull ? "Show less" : "Show more"}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overview: {
    color: "white",
    lineHeight: 20,
    marginTop: 10,
    fontSize: 16,
  },
  showText: {
    color: "#646ae0",
    textDecorationLine: "underline",
    fontSize: 20,
  },
});

export default CollapsableOverview;
