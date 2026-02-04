import SkeletonLoader from "@/components/SkeletonLoader";
import { Canvas } from "@shopify/react-native-skia";
import React, { FC, Fragment } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";

const MAX_ROWS = 3;
const MAX_COLS = 2;

const POSTER_WIDTH = 156;
const POSTER_HEIGHT = 235;

const TEXT_WIDTH = 124;
const TEXT_HEIGHT = 18;

const ROWS = new Array(MAX_ROWS).fill(0).map((_, i) => i);
const COLUMNS = new Array(MAX_COLS).fill(0).map((_, i) => i);

const ROW_GAP = 25;
const SPACE_BETWEEN_POSTER_AND_TEXT = 4;
const PADDING_TOP = 10;
const TOTAL_EXTRA_HEIGHT_PER_ROW = PADDING_TOP + SPACE_BETWEEN_POSTER_AND_TEXT;

const MovieSkeletonLoader: FC = () => {
  const { width: windowsWidth } = useWindowDimensions();
  const posterPaddingHorizontal =
    (windowsWidth - POSTER_WIDTH * MAX_COLS) / (MAX_COLS + 1);

  return (
    <Animated.View exiting={FadeOut.duration(400)} style={styles.container}>
      <Canvas style={styles.container}>
        {ROWS.map((row) =>
          COLUMNS.map((column) => (
            <Fragment key={`${row}-${column}`}>
              <SkeletonLoader
                x={
                  column * POSTER_WIDTH + (column + 1) * posterPaddingHorizontal
                }
                y={
                  row * POSTER_HEIGHT +
                  PADDING_TOP +
                  row * ROW_GAP +
                  TEXT_HEIGHT * row
                }
                width={POSTER_WIDTH}
                height={POSTER_HEIGHT}
                duration={1600}
              />
              <SkeletonLoader
                x={
                  column * POSTER_WIDTH +
                  (column + 1) * posterPaddingHorizontal +
                  (POSTER_WIDTH - TEXT_WIDTH) / 2
                }
                y={
                  (row + 1) * POSTER_HEIGHT +
                  row * ROW_GAP +
                  TEXT_HEIGHT * row +
                  TOTAL_EXTRA_HEIGHT_PER_ROW
                }
                width={TEXT_WIDTH}
                height={TEXT_HEIGHT}
                duration={1600}
              />
            </Fragment>
          )),
        )}
      </Canvas>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MovieSkeletonLoader;
