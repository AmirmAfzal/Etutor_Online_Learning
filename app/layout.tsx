import { Poppins } from "next/font/google";

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
  return (
    <html lang="fa">
      <body className={`bg-base-100 ${poppins.variable}`}>
        <AuthProvider>
          <Navbar />
          <main className="no-scrollbar min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
