import Link from "next/link";
import Image from "next/image";

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

const MobileNavbar = () => {
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
          <Icon icon="ph:bell" width="20" height="20" />
          <Icon icon="ph:heart" width="20" height="20" />
          <Icon icon="ph:shopping-cart-simple" width="20" height="20" />
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
          <Link href="" className="btn btn-soft btn-primary btn-xs mr-2">
            Create Account
          </Link>
          <Link href="" className="btn btn-primary btn-xs">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MobileNavbar;
