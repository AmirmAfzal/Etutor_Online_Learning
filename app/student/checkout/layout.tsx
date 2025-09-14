import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";

const StudentCheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-base-100 flex w-full flex-col items-center justify-center pb-16">
      <div className="bg-base-200 flex h-32 w-full flex-col items-center justify-center gap-3">
        <h4 className="text-base-content/80 text-xl font-semibold">Checkout</h4>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="md:text-md text-sm">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/shopping-cart"
                className="md:text-md text-sm"
              >
                shopping cart
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/student/checkout"
                className="text-base-content/80 md:text-md text-sm"
              >
                checkout
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mt-10 w-full max-w-5xl">{children}</div>
    </div>
  );
};

export default StudentCheckoutLayout;
