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
  return <DashboardContent />;
}

function DashboardContent() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {mockStats.map((stat) => (
          <Card key={stat.name} className="border">
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

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>
            Overview of your latest invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <div className="font-medium">{invoice.customerName}</div>
                  <div className="text-sm text-gray-500">{invoice.invoiceNumber}</div>
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
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}