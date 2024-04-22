"use client";

import * as React from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useCustomPrompt } from "@/app/hooks/use-custom-prompt";
import { useEffect } from "react";
import { useGetInstructionQuery } from "@/redux/features/chatApiSlice";
import { useActions } from "@/app/hooks/use-actions";

export function Actions({
  selectedConversationId,
  setSelectedConversationId,
}: {
  selectedConversationId: string | null;
  setSelectedConversationId: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}) {
  const { deleteConversation } = useActions();
  const [open, setIsOpen] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const { customPrompt, handleInputChange, handleSave } = useCustomPrompt();
  const { data: instruction, error } = useGetInstructionQuery();

  useEffect(() => {
    if (instruction) {
      handleInputChange({ target: { value: instruction } });
    }
  }, [instruction]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <span className="sr-only">Actions</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            Custom Prompt Instruction
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            Delete Conversation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Change Custom Prompt</DialogTitle>
            <DialogDescription>
              Input your custom prompt here to shape the interactions with the
              AI. This prompt will guide the AI&apos;s responses and can be
              tailored to specific tasks, enhancing your experience and
              efficiency.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Your Custom Prompt</Label>
              <Textarea
                id="system-prompt"
                className="h-48"
                placeholder="Type your custom AI prompt here."
                value={customPrompt}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This conversation will no longer be
              accessible by you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedConversationId !== null) {
                  deleteConversation(selectedConversationId, () => {
                    setSelectedConversationId(null);
                    setShowDeleteDialog(false);
                  });
                } else {
                  toast({
                    title: "Error",
                    description: "No Conversation selected.",
                  });
                  setShowDeleteDialog(false);
                }
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
