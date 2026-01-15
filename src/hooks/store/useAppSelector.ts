import type { RootState } from "@/utils/store";
import { useSelector } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppSelector = useSelector.withTypes<RootState>();

export default useAppSelector;
