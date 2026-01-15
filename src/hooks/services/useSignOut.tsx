import { signOutResponseMapper } from "@/utils/mappers/tmdbMappers";
import tmdbSingleton from "@/utils/singletons/tmdbSingleton";
import { SignOutResponse } from "@/utils/types/tmdbTypes";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Alert } from "react-native";

const queryFn = async () => {
  try {
    const { data } = await tmdbSingleton.delete<SignOutResponse>(
      "/authentication/session",
    );
    return signOutResponseMapper(data);
  } catch (error) {
    if (isAxiosError(error)) {
      Alert.alert("Error", error.response?.data?.status_message);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
};

const useSignOut = () => {
  return useMutation({
    mutationKey: ["delete-token"],
    mutationFn: queryFn,
  });
};

export default useSignOut;
