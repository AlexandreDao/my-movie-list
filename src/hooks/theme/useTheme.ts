import useAppSelector from "@/hooks/store/useAppSelector";

const useTheme = () => {
  return useAppSelector((state) => state.theme);
};

export default useTheme;
