'use client'
import Link from "next/link"
import {Button} from "@/components/ui/Button"

export default function Header() {
  return (
    <header className="bg-[#030303] ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              InvoCraft
            </Link>
          </div>
          <nav className="hidden ml-28 md:flex space-x-10">
            <Link
              href="#features"
              className="text-slate-100   font-medium text-muted-foreground hover:text-foreground hover:border-b border-teal-500 transition-colors "
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-slate-100   font-medium text-muted-foreground hover:text-foreground hover:border-b border-teal-500 transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-slate-100  font-medium text-muted-foreground hover:text-foreground hover:border-b border-teal-500 transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {/* <ThemeToggle /> */}
            <Button variant="outline" className="hidden sm:inline-flex">
              Log in
            </Button>
            <Button className="hover:border text-[#8f9eb2]  hover:border-teal-500">Sign up</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

