"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, MapPin, Receipt, X } from "lucide-react";
import { CompanyContent } from "./components/CompanyContent";

// Mock company data
const mockCompanyData = {
  name: "Acme Corporation",
  logo: "https://via.placeholder.com/150",
  businessType: "Corporation",
  streetAddress: "123 Business Ave",
  city: "Metropolis",
  state: "NY",
  zipCode: "10001",
  country: "United States",
  taxId: "12-3456789",
  vatNumber: "VAT123456",
};

export default function CompanyPage() {
  // const [isSubscribed] = useState(false);
  // const [showPaywall, setShowPaywall] = useState(true);

  // if (!isSubscribed && showPaywall) {
  //   return (
  //     <div className="relative">
  //       <div className="filter blur-sm pointer-events-none">
  //         <CompanyContent />
  //       </div>
  //       <div className="absolute inset-0 flex items-center justify-center bg-black/5">
  //         <Card className="w-full max-w-md mx-4 relative">
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             className="absolute right-2 top-2"
  //             onClick={() => setShowPaywall(false)}
  //           >
  //             <X className="h-4 w-4" />
  //           </Button>
  //           <CardHeader className="text-center">
  //             <CardTitle className="text-2xl font-bold">
  //               Subscribe to Manage Company Details
  //             </CardTitle>
  //             <CardDescription>
  //               Update and manage your company information
  //             </CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             <Button className="w-full" size="lg">
  //               Subscribe Now
  //             </Button>
  //           </CardContent>
  //         </Card>
  //       </div>
  //     </div>
  //   );
  // }

  return <CompanyContent />;
}