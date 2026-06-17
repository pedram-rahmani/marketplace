import React from "react";
import SideBar from "@/components/user/UserAccount/SideBar";
import Header from "@/components/user/UserAccount/Header";
import AuthGuard from "@/components/guards/AuthGuard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل کاربری",
  description: "مدیریت حساب کاربری",
};

interface UserAccountLayoutProps {
  children: React.ReactNode;
}

export default function UserAccountLayout({ children }: UserAccountLayoutProps) {
  return (
    <section className="flex md:pr-67">
      <SideBar />
      <section className="w-full">
        <Header />
        <main className="max-w-333 w-full px-4 md:px-8 pb-5 md:pb-8 mx-auto">
          <AuthGuard>
            {children}
          </AuthGuard>
        </main>
      </section>
    </section>
  );
}