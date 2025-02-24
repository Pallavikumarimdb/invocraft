'use client'
import { Check } from "lucide-react"
import {Button} from "@/components/ui/Button"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Starter",
    price: "$19/month",
    features: [
      "Up to 3 clients",
      "Basic invoicing",
      "Standard customer tracking",
      "5GB secure cloud storage",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "$99/month",
    features: [
      "Unlimited clients",
      "Custom branding on invoices",
      "Advanced automation (reminders, late fees, etc.)",
      "100GB secure cloud storage",
      "Phone & live chat support",
      "Comprehensive analytics & insights",
      "Third-party integrations (CRM, Accounting software, etc.)",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Enterprise-grade security & compliance",
      "Unlimited clients & team members",
      "AI-powered financial insights",
      "On-premise deployment option",
      "Custom feature development",
      "Dedicated account manager",
      "24/7 priority support",
      "API access & advanced integrations",
    ],
  },
];


export default function Pricing() {
    return (
        <div className="w-full bg-slate-300 px-[10%] bg-dot-black/[0.4] relative flex items-center justify-center">
          <div className="text-gray-900 py-16 sm:py-24 relative overflow-hidden" id="pricing">
            <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">Simple, transparent pricing</h2>
                <p className="mt-4 text-xl text-muted-foreground">Choose the plan that's right for your business</p>
              </motion.div>
              <div className="mt-16 grid gap-20 lg:grid-cols-3">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    className={`border border-teal-500 rounded-lg shadow-sm divide-y divide-border ${plan.name === "Professional" ? "bg-[#0f0e0d]  text-gray-100" : "bg-gray-300"}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
                  >
                    
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-foreground">{plan.name}</h3>
                      <p className="mt-4 text-3xl font-extrabold text-foreground">{plan.price}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {plan.name === "Enterprise" ? "Contact us for pricing" : "per month"}
                      </p>
                      <Button className="text-slate-200 mt-6 w-full">{plan.name === "Enterprise" ? "Contact sales" : "Get started"}</Button>
                    </div>
                    <div className="px-6 pt-6 pb-8">
                      <h4 className="text-sm font-medium text-foreground tracking-wide uppercase">What's included</h4>
                      <ul className="mt-6 space-y-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                              <Check className="h-6 w-6 text-green-500" aria-hidden="true" />
                            </div>
                            <p className="ml-3 text-sm text-muted-foreground">{feature}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }    