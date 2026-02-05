import BackButton from "@/components/BackButton";
import {
  useBottomTabBarTotalHeight,
  useSearchScreening,
  useTheme,
  withOpacity,
} from "@/hooks";
import { MapParam } from "@/utils/types/routeType";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import React, { FC, useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import MapView, { Circle, LatLng, Marker, Region } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const darkMapStyle = require("@/assets/darkMapStyle.json");

const Map: FC = () => {
  const [initRegion, setInitRegion] = useState<Region | null>(null);
  const mapRef = useRef<MapView>(null);
  const bottomTabBarHeight = useBottomTabBarTotalHeight();
  const safeAreaInset = useSafeAreaInsets();
  const { title } = useLocalSearchParams<MapParam>();
  const { data, isError, error } = useSearchScreening(title, initRegion);
  const { colors, isDarkMode } = useTheme();
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    if (isError) {
      Alert.alert("Error finding screening around you");
      console.warn(error);
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
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      mapRef.current?.animateToRegion(region, 1200);
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={isDarkMode ? darkMapStyle : []}
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider="google"
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
        {userLocation && (
          <>
            <Marker
              coordinate={userLocation}
              anchor={{ x: 0.35, y: 0.35 }}
              flat
            >
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: colors.mapMarker,
                  borderWidth: 2,
                  borderColor: colors.invariantWhite,
                }}
              />
            </Marker>
            <Circle
              center={userLocation}
              radius={20}
              fillColor={withOpacity(colors.mapMarker, 0.2)}
              strokeColor={withOpacity(colors.mapMarker, 0.7)}
            />
          </>
        )}
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
          { backgroundColor: colors.mapButton },
        ]}
        onPress={() => {
          if (initRegion) {
            mapRef.current?.animateToRegion(initRegion);
          }
        }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            backgroundColor: withOpacity(colors.mapMarker, 0.2),
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: colors.mapMarker,
              borderWidth: 2,
              borderColor: colors.invariantWhite,
            }}
          />
        </View>
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
    borderRadius: 8,
    height: 50,
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Map;
