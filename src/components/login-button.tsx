"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginButton({
  varient = "default",
  size = "default",
}: {
  varient?: "default" | "secondary";
  size?: "default" | "sm" | "lg";
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handle42Login = async () => {
    setIsLoading(true);
    try {
      router.push("/api/auth/42");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handle42Login}
      disabled={isLoading}
      variant={varient}
      size={size}
      aria-busy={isLoading}
    >
      {isLoading ? "جاري التحميل..." : "تسجيل الدخول"}
    </Button>
  );
}
