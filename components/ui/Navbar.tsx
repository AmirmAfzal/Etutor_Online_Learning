import Link from "next/link";
import Image from "next/image";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "./input";
import NavLink from "../NavLink";

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
            <SelectTrigger className="border-0 text-base-100">
              <SelectValue placeholder="USD" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="border-0 text-base-100">
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
          <Image src="/images/LOGO.png" alt="logo" className="w-35" width={200} height={80} />

          <select className="w-32 h-12 border border-base-300 rounded-none px-2">
            <option value="english">English1</option>
            <option value="english">English2</option>
          </select>

          <div className="relative">
            <Image src="/icons/search.svg" alt="search" width={20} height={20} className="absolute left-4 top-3 z-10" />
            <Input
              type="text"
              className="w-96 pl-12"
              placeholder="What do you want learn..."
              />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/icons/Bell.svg" alt="bell" width={20} height={20} />
          <Image src="/icons/Heart.svg" alt="heart" width={20} height={20} />
          <Image src="/icons/ShoppingCart.svg" alt="Shopping-cart" width={20} height={20} />
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
