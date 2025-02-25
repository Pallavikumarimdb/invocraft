'use client'
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import {Testimonials} from "@/components/sections/Testimonials"
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import {FeaturesSectionDemo} from "@/components/features/features";
import { Scroll } from "@/components/sections/Scroll";
import { useEffect, useState } from "react";


export default function Home() {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturesSectionDemo />
        <Testimonials />
        <Scroll/>
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

