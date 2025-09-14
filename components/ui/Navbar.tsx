"use client";

import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "./input";
import NavLink from "../NavLink";
import Icon from "./Icon";
import MobileNavbar from "../HomePage/MobileNavbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Separator } from "./separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <>
      <header className="border-base-300 hidden border-b lg:block">
        <nav className="bg-neutral flex items-center justify-between px-8">
          <div className="flex flex-row items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/become-instructor">Become an Instructor</NavLink>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Select>
              <SelectTrigger className="text-base-100 border-0">
                <SelectValue placeholder="USD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="text-base-100 border-0">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="englis">English</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </nav>
        <div className="flex flex-row items-center justify-between px-6 py-4">
          <div className="flex flex-row items-center gap-8">
            <Link href="/">
              <Image
                src="/images/LOGO.png"
                alt="logo"
                className="w-35"
                width={200}
                height={80}
              />
            </Link>

            <HoverCard>
              <HoverCardTrigger className="group">
                <p className="text-base-content/60 border-base-300 flex h-10 cursor-pointer flex-row items-center gap-8 border px-2 text-sm shadow">
                  Browse
                  <Icon
                    icon="ph:caret-down"
                    className="duration-300 group-data-[state=open]:rotate-180"
                    width="16"
                    height="16"
                  />
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="mt-3 ml-8 w-3xl rounded-none">
                <div className="grid w-full grid-cols-2 gap-6">
                  <div>
                    <Link href="#instructor" className="font-bold">
                      Browse Instructor
                    </Link>
                    <p className="text-base-content/70 mt-2 text-sm">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Nisi ea nam hic assumenda qui harum accusantium et nihil
                      error exercitationem?
                    </p>
                  </div>
                  <div>
                    <Link href="/courses" className="font-bold">
                      Browse Courses
                    </Link>
                    <p className="text-base-content/70 mt-2 text-sm">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Nisi ea nam hic assumenda qui harum accusantium et nihil
                      error exercitationem?
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <div className="relative">
              <Icon
                icon="ph:magnifying-glass"
                width="24"
                height="24"
                className="absolute top-2 left-2 z-10"
              />
              <Input
                type="text"
                className="w-96 pl-10"
                placeholder="What do you want learn..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    redirect(`/courses?query=${e.currentTarget.value}`);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/student/messages">
              <Icon icon="ph:bell" width="24" height="24" />
            </Link>
            <Link href="/student/wishlist">
              <Icon icon="ph:heart" width="24" height="24" />
            </Link>
            <Link href="/shopping-cart">
              <Icon icon="ph:shopping-cart-simple" width="24" height="24" />
            </Link>
            {session?.user.id ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span className="bg-base-300 flex cursor-pointer items-center justify-center rounded-full p-2">
                    <Icon icon="ph:user" width="24" height="24" />
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="absolute top-0 right-0 w-48">
                  <DropdownMenuItem>
                    <Link
                      href="/student"
                      className="flex flex-row items-center gap-2"
                    >
                      <Icon icon="ph:chart-bar" width="24" height="24" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/student/courses"
                      className="flex flex-row items-center gap-2"
                    >
                      <Icon icon="ph:stack" width="24" height="24" />
                      My Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/student/settings"
                      className="flex flex-row items-center gap-2"
                    >
                      <Icon icon="ph:gear" width="24" height="24" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <Separator className="my-2" />
                  <DropdownMenuItem>
                    <button
                      onClick={() => signOut()}
                      className="flex flex-row items-center gap-2"
                    >
                      <Icon icon="ph:sign-out" width="24" height="24" />
                      Sign-out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="btn btn-soft btn-primary ml-4"
                >
                  Create Account
                </Link>
                <Link href="/auth/signin" className="btn btn-primary">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div>
        <MobileNavbar />
      </div>
    </>
  );
};

export default Navbar;
