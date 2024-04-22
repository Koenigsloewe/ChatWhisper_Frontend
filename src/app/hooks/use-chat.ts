import { useState, useEffect, useRef } from "react";
import { toast } from "@/components/ui/use-toast";

interface Message {
    sender: string;
    message: string;
  }

export function useChat(ConversationId: string) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [input, setInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [pendingMessage, setPendingMessage] = useState(null);
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    const fetchChatHistory = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/chatbot/chat/conversation/${ConversationId}/messages/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include' 
            });
            if (!response.ok) throw new Error('Failed to fetch chat history');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch chat history.",
              });
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (message:string) => {
        setIsSending(true);
        setMessages(prev => [...prev, { message, sender: "user", pending: true }]);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/chatbot/chat/conversation/${ConversationId}/process_input/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ user_input: message }),
            });
            if (!response.ok) throw new Error('Failed to send message');
            const data = await response.json();
            toast({
                title: "Message Sent",
                description: "Your message has been sent successfully.",
              }); 
            setMessages(prev => [...prev, data]); 
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send your message.",
              });
        } finally {
            setIsSending(false);
            setInput("");
        }
    };

    useEffect(() => {
        if (ConversationId) fetchChatHistory();
    }, [ConversationId]);

    useEffect(() => {
        if (endOfMessagesRef.current) endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return {
        messages,
        isLoading,
        isError,
        input,
        setInput,
        handleSendMessage: async (event:any) => {
            event.preventDefault();
            if (!input.trim()) return;
            await sendMessage(input);
        },
        endOfMessagesRef,
        isSending
    };
}
