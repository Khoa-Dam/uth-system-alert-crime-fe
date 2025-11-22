import React from "react";

// import { SiteFooter } from "@/components/site-footer/footer";
import { LobbyNavbar } from "./components/lobby-navbar";

export default function LobbyLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <LobbyNavbar />
      <main className="space-y-10 container mx-auto py-5">{children}</main>
      {/* <SiteFooter /> */}
    </>
  );
}
