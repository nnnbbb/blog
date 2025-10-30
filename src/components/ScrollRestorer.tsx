"use client";

import { useScrollRestoration } from "@/hooks/useScrollRestoration";
interface ScrollRestorerProps {
  storageKey: string;
  containerSelector: string;
}

const ScrollRestorer = ({ storageKey, containerSelector }: ScrollRestorerProps) => {
  useScrollRestoration(storageKey, containerSelector);

  return null;
}

export default ScrollRestorer;