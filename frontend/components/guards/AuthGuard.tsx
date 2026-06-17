"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get("/me")
      .then(() => setIsAuthorized(true))
      .catch(() => router.push("/login"));
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-[#0f0f12]">
        <div className="flex flex-col items-center justify-center min-h-100 gap-4">
          <SpinnerLoader variant="multi-color" className="w-12 h-12" />
          <p className="text-sm text-gray-500 animate-pulse">
            در حال بارگذاری...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
