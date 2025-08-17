'use client';

import React from "react";

export function CardList({
    children
} : {
    children: React.ReactNode | React.ReactNode[];
}) {
    return (
        <div className="flex flex-row justify-between flex-wrap gap-y-4">
            {children}
        </div>
    )
}