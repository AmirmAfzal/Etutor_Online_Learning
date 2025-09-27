"use client";

import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

import AuthProvider from "./auth/AuthProvider";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const url = pathname.includes("/instructor/dashboard");
  return (
    <html lang="fa">
      <body className={`bg-base-100 ${poppins.variable}`}>
      <ToastContainer />
        <AuthProvider>
          {!url && <Navbar />}
          <main className="no-scrollbar min-h-screen">{children}</main>
          {!url && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
