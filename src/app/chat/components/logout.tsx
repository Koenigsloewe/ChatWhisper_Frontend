import React from "react";
import { Button } from "@/components/ui/button";

import { useLogout } from "@/app/hooks/use-logout";

export default function Logout() {
  const handleLogout = useLogout();

  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout
    </Button>
  );
}
