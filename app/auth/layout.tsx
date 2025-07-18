import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex items-center justify-center">{children}</main>;
}
