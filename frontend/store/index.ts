import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import walletReducer from "./slices/walletSlice";
import settingReducer from "./slices/settingSlice";
import reviewsReducer from "./slices/reviewsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wallet: walletReducer,
    setting: settingReducer,
    reviews: reviewsReducer,
  },
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;