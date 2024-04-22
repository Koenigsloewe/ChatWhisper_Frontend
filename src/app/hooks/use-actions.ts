// useActions.ts
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useGetAllConversationsQuery } from "@/redux/features/chatApiSlice";

export function useActions() {
  const { refetch } = useGetAllConversationsQuery(undefined, { skip: false });

  const deleteConversation = useCallback(async (ConversationId: string, onSuccess: () => void) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/chatbot/chat/conversation/${ConversationId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to delete the conversation');

      toast({
        title: "Conversation deleted successfully.",
      });
      refetch();
      onSuccess(); // Call the callback function on successful deletion
    } catch (error:any) {
      toast({
        title: "Failed to delete the conversation.",
        description: error,
      });
    }
  }, []);

  return {
    deleteConversation,
  };
}