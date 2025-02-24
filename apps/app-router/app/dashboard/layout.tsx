"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";

import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Building2,
  Menu,
  X,
  LogOut,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { name: "Company", href: "/dashboard/company", icon: Building2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPaywall, setShowPaywall] = useState(true);
  const [isSubscribed] = useState(false);

  return (
    <>
      {/* Paywall */}
      {!isSubscribed && showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur">
          <Card className="w-full bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] text-slate-100 max-w-md mx-4 relative shadow-xl rounded-xl border border-gray-100">
            <button
              // variant="ghost"
              // size="icon"
              className="absolute right-2 top-2"
              onClick={() => setShowPaywall(false)}
            >
              <X className="h-4 w-4 text-slate" />
            </button>
            <CardHeader className="text-center py-8">
              <CardTitle className="text-3xl font-extrabold ">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">Subscribe to Access Features</span>
              </CardTitle>
              <CardDescription className="mt-2  text-slate-300">
                Take your experience to the next level with our premium plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 py-2">
              <div className="space-y-4">
                {[
                  "Effortless Invoice Creation",
                  "Manage Customers",
                  "Dashboard Overview",
                  "Multi-User Access"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-slate-300" />
                    <p className="ml-4 text-lg text-slate-400 font-medium">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="px-8 mt-10 py-2 rounded-full relative bg-slate-900 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
                  <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                  <span className="relative z-20">
                    Get started for free
                  </span>
                </button>
              </div>
              <p className="my-4 text-sm text-gray-500 text-center">
                No hidden fees.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="min-h-screen bg-[#0f0e0d] bg-dot-slate/[0.4] relative text-slate-300">
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <div className="bg-transparent flex ml-96"><X className=" h-6 w-6" /></div>
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          {sidebarOpen && (
            <div className="fixed inset-0 z-40">
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
              <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <SidebarContent pathname={pathname} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-400 bg-[#0f0e0d] ">
            <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
              <SidebarContent pathname={pathname} />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          <main className="py-2 px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-8">
        <div className="flex mt-2 border-b mb-24 border-gray-400 items-center space-x-2">
          <Logo />
        </div>

        <nav className="flex-1 space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                pathname === item.href
                  ? "bg-[#47506e] text-slate-200"
                  : "text-gray-800 hover:bg-gray-800 hover:text-gray-600",
                "group mt-14 flex items-center rounded-md px-3 py-2 text-sm  font-medium"
              )}
            >
              <item.icon
                className={cn(
                  pathname === item.href
                    ? "text-slate-200"
                    : "text-slate-400 group-hover:text-gray-500",
                  "mr-3 h-6 w-6 flex-shrink-0"
                )}
              />
              <span className="text-slate-300">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-400  pt-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => {
            // Handle logout after backend
          }}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </Button>
      </div>
    </div>
  );
}