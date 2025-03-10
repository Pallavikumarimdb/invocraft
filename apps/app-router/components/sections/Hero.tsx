"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import { AnimatedTooltip } from "../ui/animated-tooltip"
import Image from 'next/image'


const pacifico = Pacifico({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-pacifico",
})

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string
    delay?: number
    width?: number
    height?: number
    rotate?: number
    gradient?: string
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
                    )}
                />
            </motion.div>
        </motion.div>
    )
}

export default function Hero({
    title1 = "Elevate Your",
    title2 = "Business",
}: {
    badge?: string
    title1?: string
    title2?: string
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    }


    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
            <div className="absolute inset-0 " />
            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="px-[10%] mx-auto text-center">
                    <div className="flex flex-row items-center justify-between mb-10 mt-20 w-full">
                        <div>
                        <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                    >
                        <button className="bg-slate-800  mb-8 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                            <span className="absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </span>
                            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                <span>
                                    Manage Customer and invoices  ✨
                                </span>
                                <svg
                                    fill="none"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    width="16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.75 8.75L14.25 12L10.75 15.25"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                        </button>
                    </motion.div>
                        <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 text-center">{title1}</span>
                            <br />
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 px-10 ",
                                    pacifico.className,
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>
                    <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
                        <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                        Empowering businesses with seamless invoicing and customer management through innovation and technology.
                        </p>
                    </motion.div>
                    <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
                    <div className="flex flex-row items-center justify-center mb-10 mt-20 w-full">
                        <AnimatedTooltip items={people} />
                    </div>
                </motion.div>
                        </div>
                        <div>
                        <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
                           <Image src="/invoice.png" alt="John Doe" width={500} height={500} className="border-2 border-black rounded-lg" />
                        </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const people = [
    {
        id: 1,
        name: "John Doe",
        designation: "Software Engineer",
        image:
            "/img1.jpeg",
    },
    {
        id: 2,
        name: "Robert Johnson",
        designation: "Product Manager",
        image:
            "/img2.jpeg",
    },
    {
        id: 3,
        name: "Jane Smith",
        designation: "Data Scientist",
        image:
            "/img3.jpeg",
    },
    {
        id: 4,
        name: "Emily Davis",
        designation: "UX Designer",
        image:
            "/img4.jpeg",
    },
    {
        id: 5,
        name: "Tyler Durden",
        designation: "Founder",
        image:
            "/img5.jpeg",
    },
    {
        id: 6,
        name: "Dora",
        designation: "Freelancer",
        image:
            "/img6.jpeg",
    },
];