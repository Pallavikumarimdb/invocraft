"use client";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import {
  DollarSign,
  Users,
  FileText,
} from "lucide-react";
import { mockInvoices } from "./data/mockData";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const mockStats = [
  {
    name: "Total Revenue",
    value: "$45,231.89",
    icon: DollarSign,
    change: "+20.1%",
    changeType: "positive",
  },
  {
    name: "Invoices",
    value: "2,345",
    icon: FileText,
    change: "+15%",
    changeType: "positive",
  },
  {
    name: "Customers",
    value: "123",
    icon: Users,
    change: "+8.1%",
    changeType: "positive",
  },
];

const mockRecentInvoices = [
  {
    id: "INV001",
    customer: "Acme Corp",
    amount: "$1,234.56",
    status: "paid",
    date: "2024-03-15",
  },
  {
    id: "INV002",
    customer: "Globex Corp",
    amount: "$2,345.67",
    status: "pending",
    date: "2024-03-14",
  },
  {
    id: "INV003",
    customer: "Stark Industries",
    amount: "$3,456.78",
    status: "overdue",
    date: "2024-03-13",
  },
];

export default function DashboardPage() {
   const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
        setMounted(true);
    }, []);
  
    if (!mounted) {
        return (
          <div className="min-h-screen w-full bg-[#030303] p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-[#130303]"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-[#130303]"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-[#130303]"></div>
                  <div className="col-span-1 h-2 rounded bg-[#130303]"></div>
                </div>
                <div className="h-2 rounded bg-[#130303]"></div>
              </div>
            </div>
          </div>
        </div>
        );
    }
  
  return(
    <div>
        <Navbar />
       <DashboardContent />
    </div>
  )
}

function DashboardContent() {
  return (
    <div>
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3">
        {mockStats.map((stat, index) => (
          <Card key={`${stat.name}-${index}`} className="border border-gray-400">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div
                className={`text-xs ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
  
      {/* Recent Invoices Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Recent Invoices</CardTitle>
          <CardDescription className="text-sm text-gray-400">
            Overview of your latest invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInvoices.map((invoice, index) => (
              <div
                key={`${invoice._id}-${index}`} // Ensure uniqueness
                className="flex items-center justify-between border-b border-gray-400 pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <div className="font-medium">{invoice.customerName}</div>
                  <div className="text-sm text-gray-500">
                    {invoice.invoiceNumber}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{invoice.amount}</div>
                  <div
                    className={`text-sm ${
                      invoice.status === "paid"
                        ? "text-green-600"
                        : invoice.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>  
  );
}