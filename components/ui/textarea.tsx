import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "textarea selection:bg-primary selection:text-base-300 w-full",
        "focus-visible:ring-primary focus-visible:ring-opacity-50 focus-visible:border-primary dark:focus-visible:ring-opacity-50 focus-visible:ring-1",
        "aria-invalid:input-error aria-invalid:ring-opacity-20 dark:aria-invalid:ring-opacity-20",
        className
      )}
      {...props}
    />
  );
}

export { Textarea }
