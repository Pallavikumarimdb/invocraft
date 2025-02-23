'use client'
import { motion } from "framer-motion"

export default function CTA() {
    return (
        <div className="h-[38rem] w-full bg-slate-300 bg-dot-black/[0.4] relative text-slate-300 flex items-center justify-center">
            <div className="max-w-6xl bg-[#0f0e0d] rounded-2xl mx-auto text-center py-16 px-20 sm:py-20 sm:px-10 lg:px-36">
                <motion.h2
                    className="text-3xl font-extrabold t text-slate-100 sm:text-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <span className="block">Ready to streamline your workflow?</span>
                    <span className="block mt-2">Start your free trial today.</span>
                </motion.h2>
                <motion.p
                    className="mt-4 text-lg leading-6  text-slate-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Join thousands of satisfied customers who have transformed their business with StreamLine.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <button className="px-8 mt-10 py-3 rounded-full relative bg-slate-900 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
                        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                        <span className="relative z-20">
                        Get started for free
                        </span>
                    </button>
                </motion.div>
            </div>
        </div>
    )
}

