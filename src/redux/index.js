import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import customerReducer from "./slices/customerSlice";
import zoneReducer from "./slices/zoneSlice";
import planReducer from "./slices/planSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  customers: customerReducer,
  zones: zoneReducer,
  plans: planReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
