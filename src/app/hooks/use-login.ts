import React from 'react';
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { setAuth } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';

const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export function useLogin() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [login] = useLoginMutation();
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FieldValues): Promise<void> => {
    setIsLoading(true);
    try {
      await login(data).unwrap();
      toast({
        title: "Success",
        description: "Login successful. Welcome back!",
      });
      dispatch(setAuth());
      router.push("/chat");
    } catch (error: any) {
      if ('data' in error && error.data && typeof error.data === 'object') {
        const errors = error.data;
        Object.keys(errors).forEach((key) => {
          const messages = errors[key]
          toast({
            title: "Login Error",
            description: messages,
          });
        });
      } else {
        toast({
          title: "Login Error",
          description: "Failed to login. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
  };
}
