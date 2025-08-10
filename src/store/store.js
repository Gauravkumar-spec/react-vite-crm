import { configureStore } from "@reduxjs/toolkit";
import { propertyApi } from "../services/propertyApi";
import { agentApi } from "../services/agentApi";
import { leadApi } from "../services/leadApi";

export const store = configureStore({
  reducer: {
    [propertyApi.reducerPath]: propertyApi.reducer,
    [agentApi.reducerPath]: agentApi.reducer,
    [leadApi.reducerPath]: leadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(propertyApi.middleware)
      .concat(agentApi.middleware)
      .concat(leadApi.middleware),
});
