import { useTheme, withOpacity } from "@/hooks";
import { MovieDataEntryMapped } from "@/utils/types/tmdbMappedTypes";
import { FC } from "react";
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type MovieDisplayProps = {
  data: MovieDataEntryMapped;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const MovieDisplay: FC<MovieDisplayProps> = ({ data, style, onPress }) => {
  const posterPath = `${process.env.EXPO_PUBLIC_TMDB_BASE_URL}${process.env.EXPO_PUBLIC_TMDB_POSTER_SIZE}${data.posterPath}`;
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} style={styles.mainContainer}>
      {({ pressed }) => (
        <View style={styles.container}>
          <Image
            source={{ cache: "force-cache", uri: posterPath }}
            fadeDuration={0}
            height={235}
            width={165}
            resizeMode={"contain"}
          />
          <Text style={{ color: colors.textPrimary }}>{data.title}</Text>
          {pressed && (
            <View
              style={[
                styles.overlay,
                { backgroundColor: withOpacity(colors.backgroundPrimary, 0.9) },
              ]}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 165,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    gap: 4,
  },
});

export default MovieDisplay;
