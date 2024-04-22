import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import * as React from "react";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useRegisterMutation } from "@/redux/features/authApiSlice";

const formSchema = z
    .object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        email: z.string().email({
            message: "Invalid email address.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        passwordRepeat: z.string(),
    })
    .refine((data) => data.password === data.passwordRepeat, {
        message: "Passwords must match.",
        path: ["passwordRepeat"],
    });

export function useRegister() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [register] = useRegisterMutation();

    const router = useRouter();
    const { toast } = useToast();

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: any): Promise<void> => {
        setIsLoading(true);

        const { username, email, password, passwordRepeat } = data;

        if (data.password !== data.passwordRepeat) {
            form.setError("passwordRepeat", {
                type: "manual",
                message: "Passwords must match.",
            });
            return;
        }

        try {
            await register({
                email,
                username,
                password,
                re_password: passwordRepeat,
            }).unwrap();
            toast({
                title: "Success",
                description: "You've been registered successfully!",
            });
            router.push("/chat");
        } catch (error: any) {
            if ('data' in error && error.data && typeof error.data === 'object') {
                const errors = error.data;
                Object.keys(errors).forEach((key) => {
                    const messages = errors[key].join(' ');
                    toast({
                        title: "Error with " + key,
                        description: messages,
                    });
                });
            } else {
                toast({
                    title: "Error",
                    description: "There was a problem processing your request. Please try again.",
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
