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
  { name: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/app/dashboard/customers", icon: Users },
  { name: "Invoices", href: "/app/dashboard/invoices", icon: FileText },
  { name: "Company", href: "/app/dashboard/company", icon: Building2 },
  { name: "Settings", href: "/app/dashboard/settings", icon: Settings },
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
          <Card className="w-full bg-white max-w-md mx-4 relative shadow-xl rounded-xl border border-gray-100">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => setShowPaywall(false)}
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
            <CardHeader className="text-center py-8">
              <CardTitle className="text-3xl font-extrabold text-gray-900">
                Subscribe to Access Features
              </CardTitle>
              <CardDescription className="mt-2 text-gray-700">
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
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                    <p className="ml-4 text-lg text-gray-800 font-medium">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300" size="lg">
                  Subscribe Now with Basic Plan - $10/month
                </Button>
              </div>
              <p className="my-4 text-sm text-gray-500 text-center">
                No hidden fees.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
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
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
              <SidebarContent pathname={pathname} />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          <main className="py-8 px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-8">
        <div className="flex mt-2 items-center space-x-2">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                pathname === item.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-800 hover:bg-gray-50 hover:text-gray-900",
                "group mt-10 flex items-center rounded-md px-3 py-2 text-sm font-medium"
              )}
            >
              <item.icon
                className={cn(
                  pathname === item.href
                    ? "text-blue-600"
                    : "text-blue-500 group-hover:text-gray-500",
                  "mr-3 h-6 w-6 flex-shrink-0"
                )}
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t pt-4">
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