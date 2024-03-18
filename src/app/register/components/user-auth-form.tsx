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

const formSchema = z
    .object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        email: z.string().email({
            message: "Invalid email address.",
        }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
        passwordRepeat: z.string(),
    })
    .refine((data) => data.password === data.passwordRepeat, {
        message: "Passwords must match.",
        path: ["passwordRepeat"],
    });

export function UserAuthForm() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
    });

    async function onSubmit(data : any) {
        setIsLoading(true);
    
        setTimeout(() => {
            setIsLoading(false);
            console.log(data); 
        }, 3000);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Your username" {...field} />
                            </FormControl>
                            {error && <FormMessage>{error.message}</FormMessage>}
                            <FormDescription>
                                Choose a unique username for your profile.
                            </FormDescription>
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="passwordRepeat"
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Repeat Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Repeat your password"
                                    {...field}
                                />
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
                    Sign Up
                </Button>
            </form>
        </Form>
    );
}
