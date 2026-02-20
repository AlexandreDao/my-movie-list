import IconButton from "@/components/IconButton";
import { useHeaderTitle, useTheme } from "@/hooks";
import { NavigationContext } from "@/utils/contexts/NavigationContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC, useContext, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomHeader: FC = () => {
  const title = useHeaderTitle();
  const isInitialized = useRef(false);
  const { setNavigationState } = useContext(NavigationContext);
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ backgroundColor: colors.header, paddingTop: insets.top }}
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        if (!isInitialized.current) {
          setNavigationState((prev) => ({
            ...prev,
            headerHeight: height,
          }));
          isInitialized.current = true;
        }
      }}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {title}
        </Text>
        <IconButton
          name="settings-outline"
          icon={Ionicons}
          onPress={() => router.push("/settings")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default CustomHeader;
