import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import {Testimonials} from "@/components/sections/Testimonials"
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import {FeaturesSectionDemo} from "@/components/features/features";
import { Scroll } from "@/components/sections/Scroll";


export default function Home() {
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

