import { useGetAllConversationsQuery } from "@/redux/features/chatApiSlice";
import React from "react";

export function useConversations() {

  const { data: conversations, isLoading, isError } = useGetAllConversationsQuery(undefined);

  return { conversations, isLoading, isError };
}
