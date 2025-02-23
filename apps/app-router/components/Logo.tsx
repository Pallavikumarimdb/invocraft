import { TicketsPlane, WalletMinimal } from "lucide-react"

export const Logo = () => {
  return (
    <a

    href="/"
    className="ml-2 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300  flex items-center"
  >
   <div className="w-10 h-10"> <TicketsPlane className="w-8 h-8 text-[#f0c9ce]" /> </div>
    InvoCraft
  </a>
  )
}