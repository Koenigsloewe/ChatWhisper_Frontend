"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RxReload } from "react-icons/rx";
import { useLogin } from "@/app/hooks/use-login";


export function UserLoginForm() {
  const { form, onSubmit, isLoading } = useLogin();

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
                Enter the email you use to sign in.
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
                <Input type="password" placeholder="Your password" {...field} />
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
          {isLoading ? <RxReload className="animate-spin mr-2" /> : null}
          Sign In
        </Button>
      </form>
    </Form>
  );
}
