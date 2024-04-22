import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GrChat } from "react-icons/gr";

export default function Home() {
  return (
    <>
      <header className="">
        <nav className="container mx-auto px-6 py-3">
          <div className="relative z-20 flex items-center justify-between text-lg font-medium">
            <Link href="/" className="flex items-center">
              <GrChat className="mr-2 h-6 w-6 " aria-hidden="true" />
              ChatWhisper
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className={cn(buttonVariants({ size: "lg" }), "w-32")}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-32"
                )}
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <Separator />

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Welcome to ChatWhisper: Your New Digital Sanctuary for Private
              Conversations.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Discover ChatWhisper – where your conversations are shielded in
              privacy and simplicity is the heart of our design. Engage in
              effortless and meaningful exchanges with those who matter most.
            </p>
            <div className="space-x-4">
              <Link
                href="/login"
                className={cn(buttonVariants({ size: "lg" }), "w-32")}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-32"
                )}
              >
                Register
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
