import { configureStore } from "@reduxjs/toolkit";
import { propertyApi } from "../services/propertyApi";
import { agentApi } from "../services/agentApi";

export const store = configureStore({
  reducer: {
    [propertyApi.reducerPath]: propertyApi.reducer,
    [agentApi.reducerPath]: agentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(propertyApi.middleware)
      .concat(agentApi.middleware),
});
