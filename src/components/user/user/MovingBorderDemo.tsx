"use client";
import React from "react";
import { Button } from "../ui/moving-border";

export function MovingBorderDemo() {
  return (
    <div className="ml-4 md:ml-20 lg:ml-40 xl:ml-8 mt-5">
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Borders are cool
      </Button>
    </div>
  );
}
