import { MovieDataEntryMapped } from "@/utils/types/tmdbMappedTypes";
import { FC } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
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
    <TouchableOpacity onPress={onPress} style={[styles.mainContainer, style]}>
      <Image src={posterPath} height={235} width={155} resizeMode={"contain"} />
      <Text style={styles.text}>{data.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 155,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  textContainer: {
    paddingLeft: 5,
    height: "100%",
    width: "50%",
  },
  text: {
    color: "white",
  },
});

export default MovieDisplay;
