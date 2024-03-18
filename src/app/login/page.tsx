import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserLoginForm } from "./components/user-login-form"; 

import { GrChat } from "react-icons/gr";

export const metadata: Metadata = {
  title: "Log In",
  description: "Access your ChatWhisper account.",
};

export default function LoginPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Log In"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Log In"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Sign Up
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/" className="flex items-center">
              <GrChat className="mr-2" />
              ChatWhisper
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
            <p className="text-lg">
                ChatWhisper is designed to transform your communication
                experience, offering seamless and enjoyable conversations with
                friends and family. Our platform emphasizes privacy and
                intuitive design, ensuring your chats remain personal and
                effortless.
              </p>
              <footer className="text-sm">© ChatWhisper</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Log In
              </h1>
              <p className="white text-sm text-muted-foreground">
                Enter your details below to access your account.
              </p>
            </div>
            <UserLoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
