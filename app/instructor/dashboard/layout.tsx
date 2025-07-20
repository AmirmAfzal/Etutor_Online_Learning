import Aside from "@/components/instructor-dashboard/Aside";
import Navbar from "@/components/instructor-dashboard/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Aside />
      <main className="flex h-full w-full flex-col">
        <Navbar>
          <SidebarTrigger />
        </Navbar>
        {children}
      </main>
    </SidebarProvider>
  );
}
