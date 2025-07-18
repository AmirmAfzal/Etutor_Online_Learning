import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

export interface SelectProps extends RadixSelect.SelectProps {
  children: React.ReactNode;
  className?: string;
}

export function Select({ children, className, ...props }: SelectProps) {
  return (
    <RadixSelect.Root {...props}>
      <RadixSelect.Trigger
        className={cn(
          "bg-base-100 border-base-content/10 focus:border-primary focus:ring-primary/20 text-base-content/60 flex w-full min-w-[180px] items-center justify-between border p-3 text-base transition-all focus:ring-0",
          className
        )}
      >
        <RadixSelect.Value />
        <RadixSelect.Icon className="ml-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path
              d="M6 8l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="bg-base-100 border-base-content/10 z-50 mt-1 border shadow-lg">
          <RadixSelect.Viewport className="p-1">
            {children}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  RadixSelect.SelectItemProps & { className?: string }
>(({ children, className, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(
      "text-base-content/80 hover:bg-primary/10 focus:bg-primary/20 cursor-pointer px-4 py-2 select-none focus:outline-none",
      className
    )}
    {...props}
  >
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
));
SelectItem.displayName = "SelectItem";
