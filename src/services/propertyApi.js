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
    propertyPreview: builder.mutation({
      query: (data) => ({
        url: "propertyPreview",
        method: "POST",
        body: data,
      }),
    }),
    propertyUpdate: builder.mutation({
      query: (data) => ({
        url: "propertyUpdate",
        method: "POST",
        body: data,
      }),
    }),
    propertyDelete: builder.mutation({
      query: (data) => ({
        url: "propertyDelete",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSetPropertyMutation,
  usePropertySearchMutation,
  usePropertyPreviewMutation,
  usePropertyUpdateMutation,
  usePropertyDeleteMutation,
} = propertyApi;
