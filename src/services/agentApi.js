import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api";

export const agentApi = createApi({
  reducerPath: "agentApi",
  baseQuery,
  endpoints: (builder) => ({
    setAgent: builder.mutation({
      query: (data) => ({
        url: "api/setAgent",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useSetAgentMutation} = agentApi;
