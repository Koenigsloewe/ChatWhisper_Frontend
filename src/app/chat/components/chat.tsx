"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { RxArrowRight } from "react-icons/rx";
import { cn } from "@/lib/utils";
import { useChat } from "@/app/hooks/use-chat";
import { Loader2 } from "lucide-react"

interface ChatProps {
  ConversationId: any;
}

export function Chat({ ConversationId }: ChatProps) {
  const {
    messages,
    isLoading,
    isError,
    input,
    setInput,
    handleSendMessage,
    endOfMessagesRef,
    isSending,
} = useChat(ConversationId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading chat history.</div>;

  return (
    <Card className="w-full h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center"></CardHeader>
        <ScrollArea>
            <CardContent>
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={cn(
                                "min-w-[200px] max-w-[75%] flex flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                message.sender === "user"
                                    ? "ml-auto bg-primary text-primary-foreground"
                                    : "bg-muted"
                            )}
                        >
                            {message.message}
                        </div>
                    ))}
                    <div ref={endOfMessagesRef} />
                </div>
            </CardContent>
        </ScrollArea>
        <CardFooter className="mt-auto">
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                <Input
                    id="message"
                    placeholder="Type your message..."
                    className="flex-1"
                    autoComplete="off"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isSending}
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isSending}>
                    <RxArrowRight className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </form>
        </CardFooter>
    </Card>
  );
}