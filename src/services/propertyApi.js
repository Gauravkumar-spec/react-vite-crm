import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api";

export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery,
  endpoints: (builder) => ({
    setProperty: builder.mutation({
      query: (data) => ({
        url: "setProperty",
        method: "POST",
        body: data,
      }),
    }),
    propertySearch: builder.mutation({
      query: (data) => ({
        url: "propertySearch",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSetPropertyMutation, usePropertySearchMutation } = propertyApi;
