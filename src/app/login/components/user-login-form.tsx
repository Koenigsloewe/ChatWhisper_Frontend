"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RxReload } from "react-icons/rx";

// Adjusted schema for login
const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

export function UserLoginForm() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
    });

    async function onSubmit(data: any) {
        setIsLoading(true);

        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false);
            console.log(data);
            // Implement login logic here
        }, 3000);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="name@example.com" {...field} />
                            </FormControl>
                            {error && <FormMessage>{error.message}</FormMessage>}
                            <FormDescription>
                                Enter the email associated with your account.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            {error && <FormMessage>{error.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full flex justify-center items-center"
                    disabled={isLoading}
                >
                    {isLoading ? <RxReload className="mr-2 animate-spin" /> : null}
                    Log In
                </Button>
            </form>
        </Form>
    );
}
