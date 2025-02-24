"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Building2, MapPin, Receipt, ArrowRight, ArrowLeft, Upload, CheckCircle2, Building, Briefcase, ClipboardCheck, CrossIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import apiClient from "@/services/apiClient";
import { GlowingEffect } from "../ui/glowing-effect";


const formSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  businessType: z.string().min(2, "Please select a business type").optional(),
  logo: z.string().optional(),
  streetAddress: z.string().min(5, "Please enter a valid street address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(2, "Please enter a valid state"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),
  country: z.string().min(2, "Please enter a valid country"),
  companyPhone: z.string().min(10, "Please enter a valid phone number"),
  companyEmail: z.string().email("Please enter a valid email address"),
  taxId: z.string().min(9, "Please enter a valid tax ID"),
  vatNumber: z.string().optional(),
});

const steps = [
  { title: "Welcome", icon: Building },
  { title: "Business Type", icon: Briefcase },
  { title: "Company Name", icon: Building2 },
  { title: "Company Logo", icon: Upload },
  { title: "Location", icon: MapPin },
  { title: "Tax Details", icon: Receipt },
  { title: "Preview", icon: ClipboardCheck },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState("");

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleGoToDashboard(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = form.getValues();

      // // Check if the user is authenticated
      // const isAuthenticated = await apiClient.get("/auth/check-session"); // Endpoint to check session validity
      // if (!isAuthenticated.data?.isLoggedIn) {
      //   throw new Error("You must be logged in to complete the onboarding.");
      // }


      const { data } = await apiClient.post("/onboarding", {
        companyName: formData.companyName,
        businessType: formData.businessType,
        logo: formData.logo,
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        companyPhone: formData.companyPhone,
        companyEmail: formData.companyEmail,
        taxId: formData.taxId,
        vatNumber: formData.vatNumber || null,
      });

      router.push(" /dashboard");
    } catch (error) {
      console.error("Error during onboarding:", error);
      if (error instanceof Error) {
        setError((error as any).response?.data?.message || "Something Went wrong!");
      } else {
        setError("Something Went wrong!");
      }
      // toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      businessType: "",
      logo: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      companyPhone: "",
      companyEmail: "",
      taxId: "",
      vatNumber: "",
    },
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        form.setValue("logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const PreviewSection = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-900">{value || "Not provided"}</p>
    </div>
  );

  return (

    <div className="min-h-screen bg-slate-300 bg-dot-black/[0.5] relative">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Progress Steps */}

        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-between items-center relative">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${i <= step
                    ? "bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] text-slate-300"
                    : "text-gray-900"
                    } transition-all duration-200`}
                >
                  <s.icon className="w-6 h-6" />
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${i <= step ? "text-[#030303]" : "text-gray-700"
                    }`}
                >
                  {s.title}
                </span>
              </div>
            ))}
            {/* Progress line */}
            <div
              className="absolute top-6 left-0 h-0.5 bg-gray-200 w-full -z-10"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb calc((100% / ${steps.length - 1}) * ${step}), #e5e7eb calc((100% / ${steps.length - 1}) * ${step}), #e5e7eb 100%)`,
              }}
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form className="space-y-8">
              {step === 0 && (
                <Card className="border-0 shadow-xl bg-transparent backdrop-blur">
                  <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <CardHeader className="space-y-6 text-center pb-10">
                    <div className="mx-auto w-16 h-16 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]  rounded-full flex items-center justify-center">
                      <Building className="w-8 h-8 text-slate-300" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold mb-4">Welcome to InvoCraft</CardTitle>
                      <CardDescription className="text-lg">
                        Let's get your business set up in just a few steps. We'll help you:
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-10">
                    <div className="space-y-6">
                      {[
                        { icon: Building2, text: "Create your company profile" },
                        { icon: MapPin, text: "Set up your business location" },
                        { icon: Receipt, text: "Configure tax information" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]  flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-slate-300" />
                          </div>
                          <span className="text-gray-900">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end pt-6 border-t">
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {step === 1 && (
                <Card className="border-0 shadow-xl  backdrop-blur">
                  <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">What type of business are you?</CardTitle>
                    <CardDescription>Select the option that best describes your business</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    {[
                      { title: "Freelancers or Business Owners", description: "Manage and send invoices, track payments, and keep your finances organized." },
                      { title: "IT Experts", description: "Simplify billing for complex projects. Track hours and generate detailed invoices." },
                      { title: "Consultants or Contractors", description: "Effortlessly handle project-based invoicing and ensure timely payments." },
                      { title: "Media or Digital Marketers", description: "Create customized invoices that reflect your brand and professionalism." },
                    ].map((type, i) => (
                      <div
                        key={i}
                        className={`p-6 rounded-lg border-2 border-gray-500 cursor-pointer transition-all ${form.watch("businessType") === type.title
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-blue-200 hover:text-slate-100 hover:bg-gray-900"
                          }`}
                        onClick={() => form.setValue("businessType", type.title)}
                      >
                        <h3 className="font-semibold mb-1">{type.title}</h3>
                        <p className="text-sm text-gray-500 hover:text-slate-300">{type.description}</p>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-gray-300"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {step === 2 && (
                <Card className="border-0 shadow-xl  backdrop-blur">
                  <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">What's your company name?</CardTitle>
                    <CardDescription>This will appear on your invoices and profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your company name"
                              className="text-lg h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 mt-10 gap-10">
                      <FormField
                        control={form.control}
                        name="companyPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your company phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companyEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Company Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your company email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>


                  </CardContent>
                  <CardFooter className="flex justify-between pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-gray-300"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {step === 3 && (
                <Card className="border-0 shadow-xl backdrop-blur">
                  <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Add your company logo</CardTitle>
                    <CardDescription>This will be displayed on your invoices and profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-center">
                        <div
                          className={`w-full h-40 border-2 border-dashed rounded-xl flex items-center justify-center transition-all ${logoPreview ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-gray-400"
                            }`}
                        >
                          {logoPreview ? (
                            <img
                              src={logoPreview}
                              alt="Logo preview"
                              className="w-full h-full object-contain p-4"
                            />
                          ) : (
                            <div id="dropzone" className="relative">
                              <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 z-10"
                                accept="image/*"
                                onChange={handleLogoUpload}
                              />
                              <div className="text-center">
                                <img
                                  className="mx-auto h-12 w-12"
                                  src="https://www.svgrepo.com/show/357902/image-upload.svg"
                                  alt="Upload Icon"
                                />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                  <span>Drag and drop</span>
                                  <span className="text-indigo-600"> or browse</span>
                                  <span> to upload</span>
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mx-auto max-w-xs">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        <p className="text-sm text-gray-500 text-center">
                          Recommended: Square image, at least 400x400px
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-gray-300"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              )}


              {step === 4 && (
                <Card className="border-0 shadow-xl backdrop-blur">
                  <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Where are you located?</CardTitle>
                    <CardDescription>Enter your business address details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="streetAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel><span className="text-slate-900">Street Address</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Enter street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><span className="text-slate-900">City</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Enter city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><span className="text-slate-900">State</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Enter state" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><span className="text-slate-900">ZIP Code</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ZIP code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel><span className="text-slate-900">Country</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Enter country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-gray-300"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {step === 5 && (
                <Card className="border-0 shadow-xl  backdrop-blur">
                  <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Tax Information</CardTitle>
                    <CardDescription>Add your business tax details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="taxId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel><span className="text-slate-900">Tax ID / EIN</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Tax ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vatNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel><span className="text-slate-900">VAT Number (Optional)</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Enter VAT number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-gray-300"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {step === 6 && (
                <Card className="border-0 shadow-xl backdrop-blur">
                  <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <CardHeader className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ClipboardCheck className="w-6 h-6 text-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]" />
                      <CardTitle className="text-2xl font-bold">Review Your Details</CardTitle>
                    </div>
                    <CardDescription>
                      Please review your company information before proceeding to the dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Company Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        {logoPreview && (
                          <img
                            src={logoPreview}
                            alt="Company logo"
                            className="w-16 h-16 rounded-lg object-contain bg-slate-200 shadow-sm"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">
                            {form.watch("companyName")}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {form.watch("businessType")}
                          </p>
                        </div>
                      </div>

                      {/* Address Details */}
                      <div className=" rounded-lg p-4 space-y-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]" />
                          Business Address
                        </h4>
                        <div className="grid gap-3 text-sm">
                          <PreviewSection
                            label="Street Address"
                            value={form.watch("streetAddress")}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <PreviewSection
                              label="City"
                              value={form.watch("city")}
                            />
                            <PreviewSection
                              label="State"
                              value={form.watch("state")}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <PreviewSection
                              label="ZIP Code"
                              value={form.watch("zipCode")}
                            />
                            <PreviewSection
                              label="Country"
                              value={form.watch("country")}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tax Information */}
                      <div className="rounded-lg p-4 space-y-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Receipt className="w-4 h-4 text-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]" />
                          Tax Information
                        </h4>
                        <div className="grid gap-3 text-sm">
                          <PreviewSection
                            label="Tax ID / EIN"
                            value={form.watch("taxId")}
                          />
                          <PreviewSection
                            label="VAT Number"
                            //@ts-ignore
                            value={form.watch("vatNumber")}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-gray-300"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <Button
                      type="button"
                      onClick={handleGoToDashboard}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isLoading ? "Logging in..." : "Go to Dashboard →"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};