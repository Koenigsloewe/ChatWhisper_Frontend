import { useSetInstructionMutation } from "@/redux/features/chatApiSlice";
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";

export function useCustomPrompt() {
    const [customPrompt, setCustomPrompt] = useState('');
    const [setInstruction] = useSetInstructionMutation();

    const handleInputChange = (event: any) => {
        setCustomPrompt(event.target.value);
      };

    const handleSave = async () => {
        try {
            await setInstruction({ inputInstruction: customPrompt }).unwrap();
            toast({
                title: "Success",
                description: "Your custom prompt has been saved.",
              });
            } catch (error) {
                toast({
                    title: "Error",
                  description: "An error occurred while saving your custom prompt.",
                });
        }
    }

    return {
        customPrompt,
        handleInputChange,
        handleSave,
    }
}
