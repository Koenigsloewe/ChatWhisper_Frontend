"use client";

import { GrChat } from "react-icons/gr";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import { Actions } from "./components/chat-actions";
import { CreateConversation } from "./components/create-conversation";
import { ChatSelector } from "./components/chat-selector";
import Logout from "./components/logout";
import { Chat } from "./components/chat";
import { useState } from "react";

export default function ChatPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">
            <Link href="/" className="flex items-center">
              <GrChat className="mr-2" />
              ChatWhisper
            </Link>
          </h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <ChatSelector onSelectConversation={(Conversation) => setSelectedConversationId(Conversation.id)} />
            <CreateConversation />
            <Actions selectedConversationId={selectedConversationId} setSelectedConversationId={setSelectedConversationId} />
            <Logout />
          </div>
        </div>
        <Separator />
        <div className="container pt-2 pb-2">
        {selectedConversationId && <Chat ConversationId={selectedConversationId} />}
        </div>
      </div>
    </>
  );
}
