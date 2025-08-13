import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api";

export const tableApi = createApi({
  reducerPath: "tableApi",
  baseQuery,
  endpoints: (builder) => ({
    dataTable: builder.mutation({
      query: (data) => ({
        url: "getEnum",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useDataTableMutation } = tableApi;
