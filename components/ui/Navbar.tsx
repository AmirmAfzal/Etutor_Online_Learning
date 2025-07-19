import Link from "next/link";
import Image from "next/image";

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

const Navbar = () => {
  return (
    <header className="border-base-300 border-b">
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
          <Image
            src="/images/LOGO.png"
            alt="logo"
            className="w-35"
            width={200}
            height={80}
          />

          <Select>
            <SelectTrigger className="text-base-100 border-0">
              <SelectValue placeholder="Browse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="englis">English</SelectItem>
              <SelectItem value="english">English</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Icon
              icon="ph:magnifying-glass"
              width="24"
              height="24"
              className="absolute top-3 left-4 z-10"
            />
            <Input
              type="text"
              className="w-96 pl-12"
              placeholder="What do you want learn..."
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Icon icon="ph:bell" width="24" height="24" />
          <Icon icon="ph:heart" width="24" height="24" />
          <Icon icon="ph:shopping-cart-simple" width="24" height="24" />
          <Link href="" className="btn btn-soft btn-primary ml-4">
            Create Account
          </Link>
          <Link href="" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
