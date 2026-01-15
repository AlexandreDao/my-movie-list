// src/utils/store/persistenceMiddleware.ts
import { RootState } from "@/utils/store";
import { signIn } from "@/utils/store/reducers/userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Middleware } from "@reduxjs/toolkit";

export enum PersistSlice {
  User = "user",
}

export const PERSIST_SLICES: PersistSlice[] = Object.values(PersistSlice);

const STORAGE_PREFIX = "persist:";

let isHydrating = true;

// Map slice enum -> action creator used to restore that slice
// Add new entries when you add reducers that need hydration
const HYDRATE_ACTIONS: Partial<Record<PersistSlice, (payload: any) => any>> = {
  [PersistSlice.User]: signIn,
};

export const persistenceMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const result = next(action);

    if (!isHydrating) {
      const state = store.getState() as RootState;

      await Promise.all(
        PERSIST_SLICES.map(async (slice) => {
          try {
            const value = (state as any)[slice];
            await AsyncStorage.setItem(
              `${STORAGE_PREFIX}${slice}`,
              JSON.stringify(value),
            );
          } catch (error) {
            console.error(`Failed to persist slice ${slice}:`, error);
          }
        }),
      );
    }

    return result;
  };

export const hydrateState = async (store: any) => {
  try {
    await Promise.all(
      PERSIST_SLICES.map(async (slice) => {
        try {
          const saved = await AsyncStorage.getItem(`${STORAGE_PREFIX}${slice}`);
          if (!saved) return;

          const parsed = JSON.parse(saved);

          const actionCreator = HYDRATE_ACTIONS[slice];
          if (actionCreator) {
            store.dispatch(actionCreator(parsed));
          } else {
            // No hydrate action registered for this slice.
            // You can register one in HYDRATE_ACTIONS, or handle restoration elsewhere.
            console.warn(`No hydrate action for slice: ${slice}`);
          }
        } catch (error) {
          console.error(`Failed to hydrate slice ${slice}:`, error);
        }
      }),
    );
  } finally {
    isHydrating = false;
  }
};
