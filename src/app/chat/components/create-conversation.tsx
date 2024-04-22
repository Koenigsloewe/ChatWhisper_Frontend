"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateConversation } from "@/app/hooks/use-create-conversation";
import { useState } from 'react';

export function CreateConversation() {
  const { name, handleChange, handleSubmit } = useCreateConversation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => setIsDialogOpen(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    handleSubmit(closeDialog); 
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Create Conversation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Conversation Name:</DialogTitle>
          <DialogDescription>
            Create a new conversation
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={handleChange} autoFocus />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleButtonClick}>Create Conversation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
