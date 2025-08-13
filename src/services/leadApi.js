import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api";

export const leadApi = createApi({
  reducerPath: "leadApi",
  baseQuery,
  endpoints: (builder) => ({
    leadSearch: builder.mutation({
      query: (data) => ({
        url: "leadSearch",
        method: "POST",
        body: data,
      }),
    }),
    setLead: builder.mutation({
      query: (data) => ({
        url: "setLead",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLeadSearchMutation , useSetLeadMutation } = leadApi;
