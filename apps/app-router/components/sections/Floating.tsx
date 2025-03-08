import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
} from "@tabler/icons-react";
import { Building2, LayoutDashboard, PersonStanding, Receipt, ReceiptText, Settings, SmilePlus } from "lucide-react";

export function Floating({ setImageSrc }: { setImageSrc: (src: string) => void }) {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      image: "/customer.png",
    },
    {
      title: "Dashboard",
      icon: <LayoutDashboard  className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      image: "/dashboard.png",
    },
    {
      title: "Customer",
      icon: <PersonStanding className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      image: "/home1.png",
    },
    {
      title: "Company",
      icon: <Building2  className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      image: "/company.png",
    },
    {
      title: "Invoices",
      icon: <Receipt className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      image: "/invoices.png",
    },
    {
      title: "Setting",
      icon: <Settings  className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      image: "/setting.png",
    },
    {
      title: "Addcustomer",
      icon: <SmilePlus className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      image: "/addcustomer.png",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <FloatingDock
        mobileClassName="translate-y-20"
        items={links.map((link) => ({
          ...link,
          onClick: () => setImageSrc(link.image), // Change Image on Click
        }))}
      />
    </div>
  );
}
