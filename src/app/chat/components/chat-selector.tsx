"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PopoverProps } from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useConversations } from "@/app/hooks/use-all-chat-conversations";

export interface Conversation {
  id: string;
  name: string;
}

interface ConversationSelectorProps extends PopoverProps {
  conversation?: Conversation[];
  onSelectConversation: (Conversation: Conversation) => void; 
}

export function ChatSelector({
  conversation = [],  
  onSelectConversation,
  ...props
}: ConversationSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(
    null
  );
  const router = useRouter();
  const { conversations, isLoading, isError } = useConversations();

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Load a conversation..."
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
        >
          {selectedConversation ? selectedConversation.name : "Load conversation..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search conversation..." />
          {isLoading ? (
            <CommandItem>Selecting...</CommandItem>
          ) : isError ? (
            <CommandEmpty>Error fetching conversation.</CommandEmpty>
          ) : (
            <>
              <CommandEmpty>No conversation found.</CommandEmpty>
              <CommandGroup>
                {conversations?.map((Conversation: Conversation) => (
                  <CommandItem
                    key={Conversation.id}
                    onSelect={() => {
                      setSelectedConversation(Conversation);
                      setOpen(false);
                      onSelectConversation(Conversation);
                    }}
                  >
                    {Conversation.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedConversation?.id === Conversation.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
