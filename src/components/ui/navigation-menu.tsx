'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react"
import 'material-symbols';
import { IconButton } from "./icon-button";
import Link from "next/link";

export function NavigationMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: "home" },
    { label: "About", href: "/about", icon: "info" },
    { label: "Contact", href: "/contact", icon: "contact_mail" },
  ]

  return (
    <div className="fixed flex justify-center w-full left-0 top-0 z-99">
      <div className="flex flex-col backdrop-saturate-[180%] backdrop-blur-[20px] bg-[var(--nav-bg)] sm:w-[390px] w-full">
        <div className="flex items-center justify-between px-[20px] h-[63px]">
          <Image
            fetchPriority="high"
            src="/logo.svg"
            alt="Logo"
            width={72}
            height={43}
            className="cursor-pointer"
            priority={true}
            draggable={false}
            onClick={() => router.push('/')}
          />
          <IconButton
            icon="lunch_dining"
            type="ghost"
            customSize="sm"
            onClick={() => setOpen(!open)}
            fill
          />
        </div>
        {open && (
          <div className="flex flex-col px-4 py-2 backdrop-saturate-[180%] backdrop-blur-[20px] bg-[var(--nav-bg)]">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 text-gray-700 py-3 px-2 hover:bg-gray-200 rounded-md transition-colors bg-transparent"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}