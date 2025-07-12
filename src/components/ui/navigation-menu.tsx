'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react"
import 'material-symbols';

export function NavigationMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: "home" },
    { label: "About", href: "/about", icon: "info" },
    { label: "Contact", href: "/contact", icon: "contact_mail" },
    { label: "Tokens Demo", href: "/tokens-demo", icon: "palette" },
  ]

  return (
    <div className="fixed flex justify-center w-full left-0 top-0">
      <div className="flex flex-col backdrop-saturate-[180%] backdrop-blur-[20px] sm:w-[390px] w-full" style={{ backgroundColor: 'var(--nav-bg)' }}>
        <div className="flex items-center justify-between px-[20px] h-[63px]">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={72}
            height={43}
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />

          {/* Hamburger Menu Button */}
          <span className="material-symbols-outlined cursor-pointer" onClick={() => setOpen(!open)}>
            lunch_dining
          </span>
        </div>
        {open && (
          <div className="flex flex-col px-4 py-2 bg-slate-50/90">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 text-gray-700 py-3 px-2 hover:bg-gray-200 rounded-md transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}