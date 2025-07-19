"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

interface Props  {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const NavLink = ({ href, children, className }: Props) => {

    const pathName = usePathname();
    const isActive = href === '/' ? pathName === '/' : pathName === href || pathName.startsWith(href);

    return (
        <Link href={href} className={`text-sm ${isActive ? "border-t-2 border-primary text-base-100 p-2" : "text-base-300"} ${className}`}>
            { children }
        </Link>
    )
}

export default NavLink