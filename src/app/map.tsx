import BackButton from "@/components/BackButton";
import {
  useAppSelector,
  useBottomTabBarTotalHeight,
  useSearchScreening,
} from "@/hooks";
import { MapParam } from "@/utils/types/routeType";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import React, { FC, useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Map: FC = () => {
  const [initRegion, setInitRegion] = useState<Region | null>(null);
  const mapRef = useRef<MapView>(null);
  const bottomTabBarHeight = useBottomTabBarTotalHeight();
  const safeAreaInset = useSafeAreaInsets();
  const { title } = useLocalSearchParams<MapParam>();
  const { data, isError, error } = useSearchScreening(title, initRegion);
  const colors = useAppSelector((state) => state.theme.colors);

  useEffect(() => {
    if (isError) {
      Alert.alert("Error finding screening around you");
    }
  }, [isError, error]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setInitRegion(region);
      mapRef.current?.animateToRegion(region, 1200);
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider="google"
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled
      >
        {data?.map((theater) => (
          <Marker key={theater.id} coordinate={theater} title={theater.name}>
            <MaterialIcons
              name="local-movies"
              size={32}
              color={colors.movieMarker}
            />
          </Marker>
        ))}
      </MapView>
      <BackButton
        style={[
          {
            top: safeAreaInset.top,
          },
          styles.back,
        ]}
      />
      <Pressable
        style={[
          {
            bottom: bottomTabBarHeight + 12,
          },
          styles.location,
          { backgroundColor: colors.invariantWhite },
        ]}
        onPress={() => {
          if (initRegion) {
            mapRef.current?.animateToRegion(initRegion);
          }
        }}
      >
        <MaterialIcons name="my-location" size={18} color={colors.mapMarker} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    position: "absolute",
    left: 0,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    position: "absolute",
    alignSelf: "flex-end",
    marginRight: "5%",
    backgroundColor: "white",
    borderRadius: 8,
    height: 50,
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Map;
