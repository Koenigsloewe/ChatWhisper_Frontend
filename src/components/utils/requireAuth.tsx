"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"; 
import { useAppSelector } from "@/redux/hooks";

interface Props {
  children: React.ReactNode;
}

const isBrowser = typeof window !== "undefined";

export default function RequireAuth({ children }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated && isBrowser) {
    toast({
        title: "Unauthorized Access",
        description: "You are not authorized to access this page.",
    });
    router.push("/login");
  }

  return <>{children}</>;
}
