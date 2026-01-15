import { Image, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { MovieDataEntry } from "../utils/types";

const BASE_URL = "http://image.tmdb.org/t/p/";
const IMAGE_SIZE = "w185"

type MovieDisplayProps = {
    data: MovieDataEntry,
    style?: ViewStyle,
}

const MovieDisplay: React.FC<MovieDisplayProps> = ({data, style}) => {
  const posterPath = BASE_URL + IMAGE_SIZE + data.poster_path;

  return (
    <TouchableOpacity style={[styles.mainContainer, style]}>
      <Image src={posterPath} height={235} width={155} resizeMode={"contain"}/>
      <Text style={styles.text}>{data.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    //backgroundColor: "#222BD4",
    width: 155,
    borderRadius: 10,
    //flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  textContainer: {
    paddingLeft: 5,
    height: "100%", 
    width: "50%"
  },
  text: {
    color: "white",
  },
});

export default MovieDisplay;