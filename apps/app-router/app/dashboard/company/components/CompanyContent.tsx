"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, MapPin, Receipt, Upload, Edit2 } from "lucide-react";
import Image from "next/image";
import { LogoEditDialog } from "./LogoEditDialog";

interface CompanyFormData {
  name: string;
  logo: string | null;
  businessType: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  taxId: string;
  vatNumber: string;
}

export function CompanyContent() {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: "Acme Corporation",
    logo: null,
    businessType: "Corporation",
    streetAddress: "123 Business Ave",
    city: "Metropolis",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    taxId: "12-3456789",
    vatNumber: "VAT123456",
  });
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewLogo(base64String);
        setFormData(prev => ({ ...prev, logo: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpdate = (newLogo: string) => {
    setFormData(prev => ({ ...prev, logo: newLogo }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container max-w-3xl mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Company Details
          </CardTitle>
          <CardDescription>
            Manage your company information and billing details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company Logo</h3>
              <div className="flex items-center gap-6">
                <div className="relative w-48 h-32 border rounded-lg flex items-center justify-center group">
                  {formData.logo ? (
                    <>
                      <Image
                        src={formData.logo}
                        alt="Company Logo"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white"
                          onClick={() => setIsLogoDialogOpen(true)}
                        >
                          <Edit2 className="h-5 w-5 mr-2" />
                          Edit Logo
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      className="text-gray-500 h-full w-full"
                      onClick={() => setIsLogoDialogOpen(true)}
                    >
                      <div>
                        <Upload className="w-12 h-12 mx-auto mb-2" />
                        <span className="text-sm">Upload Logo</span>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Company Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input
                    id="streetAddress"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Tax Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Tax Information
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input
                    id="taxId"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vatNumber">VAT Number</Label>
                  <Input
                    id="vatNumber"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <LogoEditDialog
        isOpen={isLogoDialogOpen}
        onClose={() => setIsLogoDialogOpen(false)}
        currentLogo={formData.logo}
        onSave={handleLogoUpdate}
      />
    </div>
  );
} 