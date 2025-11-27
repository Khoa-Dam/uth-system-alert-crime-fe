import React from "react";



export default function LobbyLayout({ children }: React.PropsWithChildren) {
  return (
    <main className=" mx-auto">
      <link rel="preload" href="/world-map.png" as="image" type="image/png" fetchPriority="high" />
      {children}
    </main>
  );
}
