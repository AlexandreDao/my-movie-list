import { MovieDataEntryMapped } from "@/utils/types/tmdbMappedTypes";
import { FC } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type MovieDisplayProps = {
  data: MovieDataEntryMapped;
  onPress?: () => void;
  style?: ViewStyle;
};

const MovieDisplay: FC<MovieDisplayProps> = ({ data, style, onPress }) => {
  const posterPath = `${process.env.EXPO_PUBLIC_TMDB_BASE_URL}${process.env.EXPO_PUBLIC_TMDB_POSTER_SIZE}${data.posterPath}`;

  return (
    <Pressable onPress={onPress} style={styles.mainContainer}>
      {({ pressed }) => (
        <View style={styles.container}>
          <Image
            src={posterPath}
            height={235}
            width={165}
            resizeMode={"contain"}
          />
          <Text style={styles.text}>{data.title}</Text>
          {pressed && <View style={styles.overlay} />}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 165,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: "#f6f6f63a",
  },
  container: {
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});

export default MovieDisplay;
