import { useBottomTabBarTotalHeight, useSearchScreening } from "@/hooks";
import { MapParam } from "@/utils/types/routeType";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import React, { FC, useEffect, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Map: FC = () => {
  const initRegion = useRef<Region | null>(null);
  const mapRef = useRef<MapView>(null);
  const bottomTabBarHeight = useBottomTabBarTotalHeight();
  const safeAreaInset = useSafeAreaInsets();
  const { title } = useLocalSearchParams<MapParam>();
  const { data } = useSearchScreening(title, initRegion.current);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      initRegion.current = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      mapRef.current?.animateToRegion(initRegion.current!, 1200);
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
            <MaterialIcons name="local-movies" size={32} color="red" />
          </Marker>
        ))}
      </MapView>
      <Pressable
        onPress={() => console.log("back")}
        hitSlop={24}
        style={[
          {
            top: safeAreaInset.top,
          },
          styles.back,
        ]}
      >
        <MaterialIcons
          style={{ position: "absolute" }}
          name="arrow-back"
          size={30}
          color="white"
        />
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Pressable
        style={[
          {
            bottom: bottomTabBarHeight + 12,
          },
          styles.location,
        ]}
        onPress={() => {
          if (initRegion.current) {
            mapRef.current?.animateToRegion(initRegion.current);
          }
        }}
      >
        <MaterialIcons name="my-location" size={18} color="#4285F4" />
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
