import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api";

export const agentApi = createApi({
  reducerPath: "agentApi",
  baseQuery,
  endpoints: (builder) => ({
    setAgent: builder.mutation({
      query: (data) => ({
        url: "setAgent",
        method: "POST",
        body: data,
      }),
    }),
    agentSearch : builder.mutation({
      query : (data) =>({
        url : "agentSearch",
        method : "POST",
        body : data
      })
    })
  }),
});

export const {useSetAgentMutation ,useAgentSearchMutation} = agentApi;
