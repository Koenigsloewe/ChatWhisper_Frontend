import { useState } from 'react';
import { useCreateConversationMutation, useGetAllConversationsQuery } from "@/redux/features/chatApiSlice";
import { toast } from "@/components/ui/use-toast";

export function useCreateConversation() {
    const [name, setName] = useState('');
    const [createConversation] = useCreateConversationMutation();
    const { refetch } = useGetAllConversationsQuery(undefined, {
        skip: false,
    });

    const handleChange = (event: any) => {
        setName(event.target.value);
    };

    const handleSubmit = async (closeDialog: () => void) => {

        if (!name) {
            toast({
                title: "Error",
                description: "Please enter a name for the conversation.",
            });
            return;
        }

        try {
            await createConversation({ name }).unwrap();
            refetch();
            setName('');
            toast({
                title: "Success",
                description: "Your conversation has been created.",
            });
            closeDialog();
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while creating the conversation.",
            });
        }
    }

    return {
        name,
        handleChange,
        handleSubmit,
    };
}
