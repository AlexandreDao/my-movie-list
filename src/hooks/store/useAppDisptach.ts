import type { AppDispatch } from "@/utils/store";
import { useDispatch } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;
