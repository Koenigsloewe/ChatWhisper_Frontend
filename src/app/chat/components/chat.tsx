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

export function Chat() {
  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content:
        "Hi, how can I help you today? Hi, how can I help you today? Hi, how can I help you today? Hi, how can I help you today? Hi, how can I help you today?",
    },
    { role: "user", content: "Hey, I'm having trouble with my account." },
    { role: "agent", content: "What seems to be the problem?" },
    { role: "user", content: "I can't log in." },
  ]);
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;
  const endOfMessagesRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <Card className="w-full h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center">
          {/* Card Header Content */}
        </CardHeader>
        <ScrollArea>
          <CardContent>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "min-w-[200px] max-w-[75%] flex flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground overflow-wrap break-word"
                      : "bg-muted overflow-wrap break-word"
                  )}
                >
                  {message.content}
                </div>
              ))}
            </div>
          </CardContent>
        </ScrollArea>
        <CardFooter className="mt-auto">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              setMessages([...messages, { role: "user", content: input }]);
              setInput("");
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <RxArrowRight className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
