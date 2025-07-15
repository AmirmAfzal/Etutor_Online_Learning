import Link from "next/link";

const navItems = [
  { href: "/student-dashboard", label: "Dashboard" },
  { href: "/student-dashboard/courses", label: "Courses" },
  { href: "/student-dashboard/teachers", label: "Teachers" },
  { href: "/student-dashboard/messages", label: "Messages" },
  { href: "/student-dashboard/wishlist", label: "Wishlist" },
  { href: "/student-dashboard/purchase-history", label: "Purchase History" },
  { href: "/student-dashboard/settings", label: "Settings" },
];

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="mb-8 flex gap-6 border-b bg-white px-4 py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition-colors hover:text-orange-500"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
}
