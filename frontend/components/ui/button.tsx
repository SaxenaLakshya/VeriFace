"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-[hsl(185,100%,50%)] text-black font-orbitron font-bold tracking-widest text-xs uppercase shadow-[0_0_40px_hsl(185,100%,50%,0.35)] hover:shadow-[0_0_60px_hsl(185,100%,50%,0.5)] hover:-translate-y-[1px] active:translate-y-0",
        heroGhost:
          "bg-transparent border border-[hsl(0,0%,100%,0.12)] text-foreground/80 font-syne text-sm hover:border-[hsl(0,0%,100%,0.25)] hover:bg-[hsl(0,0%,100%,0.04)] hover:-translate-y-[1px]",
        nav: "bg-transparent border border-[hsl(0,0%,100%,0.1)] text-foreground/70 font-syne text-sm hover:bg-[hsl(0,0%,100%,0.05)] hover:border-[hsl(0,0%,100%,0.2)] hover:text-foreground",
        navCta:
          "bg-[hsl(185,100%,50%,0.1)] border border-[hsl(185,100%,50%,0.25)] text-[hsl(185,100%,50%)] font-orbitron font-bold text-[0.72rem] tracking-widest uppercase hover:bg-[hsl(185,100%,50%,0.18)] hover:border-[hsl(185,100%,50%,0.4)] hover:shadow-[0_0_20px_hsl(185,100%,50%,0.15)]",
        social:
          "bg-[hsl(0,0%,100%,0.04)] border border-[hsl(0,0%,100%,0.08)] text-foreground/70 font-syne text-sm hover:bg-[hsl(0,0%,100%,0.08)] hover:border-[hsl(0,0%,100%,0.15)] hover:text-foreground",
        submit:
          "w-full bg-[hsl(185,100%,50%)] text-black font-orbitron font-bold text-xs tracking-widest uppercase shadow-[0_0_30px_hsl(185,100%,50%,0.3)] hover:shadow-[0_0_50px_hsl(185,100%,50%,0.5)] hover:-translate-y-[1px]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
