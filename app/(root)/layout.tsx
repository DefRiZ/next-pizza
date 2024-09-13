import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { Header } from "@/components/shared/header";

export const metadata: Metadata = {
  title: "Next Pizza | Головна",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      {modal}
    </main>
  );
}
