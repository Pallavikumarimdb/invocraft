"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "../../../lib/utils";
import Link from "next/link";
import apiClient from "@/services/apiClient";

export default function SignupFormDemo() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data } = await apiClient.post("/auth/login", { email, password });
      localStorage.setItem("access_token", data.access_token);
      router.push("/onboarding");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="w-full h-screen bg-[#0f0e0d] bg-dot-white/[0.4] relative text-slate-300 flex items-center justify-center">
    <div className="max-w-md w-full relative z-10 mx-auto mt-20 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        LogIn
      </h2>
      <form className="my-8" onSubmit={handleLogin}>
        {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div> */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" placeholder="••••••••" type="password" required />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br mt-10 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Sign In →"}
          <BottomGradient />
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <p className="text-center mt-6 text-sm">
        Don't have an account? <Link href="/signup" className="text-blue-500">Sign up</Link>
      </p>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};




const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};


function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
      <motion.div
          initial={{
              opacity: 0,
              y: -150,
              rotate: rotate - 15,
          }}
          animate={{
              opacity: 1,
              y: 0,
              rotate: rotate,
          }}
          transition={{
              duration: 2.4,
              delay,
              ease: [0.23, 0.86, 0.39, 0.96],
              opacity: { duration: 1.2 },
          }}
          className={cn("absolute", className)}
      >
          <motion.div
              animate={{
                  y: [0, 15, 0],
              }}
              transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
              }}
              style={{
                  width,
                  height,
              }}
              className="relative"
          >
              <div
                  className={cn(
                      "absolute inset-0 rounded-full",
                      "bg-gradient-to-r to-transparent",
                      gradient,
                      "backdrop-blur-[2px] border-2 border-white/[0.15]",
                      "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                      "after:absolute after:inset-0 after:rounded-full",
                      "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
                  )}
              />
          </motion.div>
      </motion.div>
  )
}

