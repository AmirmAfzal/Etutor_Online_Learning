"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Icon from "../ui/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

const MobileNavbar = () => {
  const { data: session } = useSession();
  const links = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Courses",
      url: "/courses",
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Contact",
      url: "/contact",
    },
    {
      title: "Become an Instructor",
      url: "/become-instructor",
    },
  ];

  return (
    <header className="block lg:hidden">
      <nav className="bg-neutral text-base-300 flex flex-row items-center justify-between px-2">
        <Sheet>
          <SheetTrigger asChild>
            <button className="btn btn-ghost">
              <Icon
                icon="material-symbols:menu-rounded"
                width="24"
                height="24"
              />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="max-w-64">
            <SheetHeader>
              <SheetTitle className="flex flex-row items-center gap-2">
                <Icon
                  icon="ph:graduation-cap"
                  className="text-primary"
                  width="32"
                  height="32"
                />
                <p className="text-base-content text-xl">E-tutor</p>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.title}
                  href={link.url}
                  className="text-base-content px-2"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <button className="btn btn-primary">Close</button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <div className="flex flex-row items-center gap-2">
          <Link href="/student/messages">
            <Icon icon="ph:bell" width="20" height="20" />
          </Link>
          <Link href="/student/wishlist">
            <Icon icon="ph:heart" width="20" height="20" />
          </Link>
          <Link href="/shopping-cart">
            <Icon icon="ph:shopping-cart-simple" width="20" height="20" />
          </Link>
        </div>
      </nav>
      <div className="flex flex-row items-center justify-between p-2">
        <Image
          src="/images/LOGO.png"
          alt="logo"
          className="w-30"
          width={200}
          height={80}
        />
        <div>
          {session?.user.id ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="bg-base-300 flex items-center justify-center rounded-full p-2">
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
                className="btn btn-soft btn-primary btn-xs ml-4"
              >
                Create Account
              </Link>
              <Link href="/auth/signin" className="btn btn-primary btn-xs">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default MobileNavbar;
