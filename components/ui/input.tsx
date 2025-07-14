import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "input selection:bg-primary selection:text-base-300 w-full",
        "focus-visible:ring-primary focus-visible:ring-opacity-50 focus-visible:border-primary dark:focus-visible:ring-opacity-50 focus-visible:ring-1",
        "aria-invalid:input-error aria-invalid:ring-opacity-20 dark:aria-invalid:ring-opacity-20",
        className
      )}
      {...props}
    />
  );
}

export { Input };
