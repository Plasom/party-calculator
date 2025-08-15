'use client';

import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  customSize?: 'normal' | 'xl'
}

function Input({ className, type, customSize = 'normal', ...props }: InputProps) {
  const fontStyles = {
    normal: {
      fontSize: "var(--font-size-normal)",
      fontWeight: "medium",
    },
    xl: {
      fontSize: "var(--font-size-xl)",
      fontWeight: "semibold",
    },
  }
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full px-3 py-2 h-12 border border-[var(--color-grey-primary)] rounded-lg bg-white focus:outline-none focus:border-[var(--components-input-state-text-hovered)] placeholder:text-[var(--components-input-state-text-default)]",
        `text-[${fontStyles[customSize].fontSize}] font-${fontStyles[customSize].fontWeight}`,
        className
      )}
      {...props}
    />
  )
}

export { Input }
