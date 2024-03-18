import { Metadata } from "next";
import Image from "next/image";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

import { GrChat } from "react-icons/gr";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { PresetActions } from "./components/preset-actions";
import { PresetSave } from "./components/preset-save";
import { PresetSelector } from "./components/preset-selector";
import Logout from "./components/logout";
import { Chat } from "./components/chat";
import { presets } from "./data/presets";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page for the ChatWhisper app.",
};

export default function DashboardPage() {
  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">
            <Link href="/" className="flex items-center">
              <GrChat className="mr-2" />
              ChatWhisper
            </Link>
          </h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <PresetSave />
            <PresetActions />
            <Logout />
          </div>
        </div>
        <Separator />
        <div className="container pt-2 pb-2">
          <Chat />
        </div>
      </div>
    </>
  );
}
