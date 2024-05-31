'use client'
import { signOut } from "next-auth/react"
const Logout = () => {
  return (
    <button
      className="text-white"
      onClick={() => {
        signOut({ callbackUrl: "https://frt-cart-nextjs14.vercel.app/login" })
      }}
    >Sign Out</button>
  )
}

export default Logout