"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Building2, Package } from "lucide-react";
import { CompanyContent } from "./CompanyContent";
import { ProductManagement } from "./ProductManagement";


export function ManagementDashboard() {
  const [activeSection, setActiveSection] = useState<"company" | "product">("company");

  return (
    <div className="container max-w-3xl mx-auto py-6">
      <div className="flex justify-center gap-12 mb-4">
        <Button
          variant={activeSection === "company" ? "outline" : "default"}
          onClick={() => setActiveSection("company")}
        >
          <Building2 className="h-5 w-5 mr-2" />
          Company Management
        </Button>
        <Button
          variant={activeSection === "product" ? "outline" : "default"}
          onClick={() => setActiveSection("product")}
        >
          <Package className="h-5 w-5 mr-2" />
          Product Management
        </Button>
      </div>

      {/* Render based on active section */}
      {activeSection === "company" && <CompanyContent />}
      {activeSection === "product" && <ProductManagement />}
    </div>
  );
}
