"use client"

import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"

export function Header(){
    return (
        <div className="border-b">
            <div className="h-16 container flex justify-between items-center">
                <Link href={"/"}>Thumbnail Rater</Link>
                
                <div className="flex gap-8">
                    <SignedIn>
                        <Link href="/dashboard" className="link">Dashboard</Link>
                        <Link href="/create" className="link">Create</Link>
                    </SignedIn>
                    <SignedOut>
                        <Link href="/about" className="link">About</Link>
                        <Link href="/pricing" className="link">Pricing</Link>
                    </SignedOut>
                </div>
                <div className="flex gap-4 items-center">
                    <SignedIn><UserButton /></SignedIn>
                    <SignedOut><SignInButton /></SignedOut>
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}