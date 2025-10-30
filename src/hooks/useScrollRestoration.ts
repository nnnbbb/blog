"use client";

import { useEffect } from "react";

/**
 * useScrollRestoration - 在进入页面时恢复上次滚动位置，并在离开时保存滚动位置
 *
 * @param key 唯一 key，用于区分不同页面的滚动位置
 * @param containerSelector 指定监听的容器选择器
 */
export function useScrollRestoration(storageKey: string, containerSelector: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 禁止浏览器自动恢复滚动位置
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const sc = document.scrollingElement || document.documentElement || document.body;
    const savedScroll = Number(sessionStorage.getItem(storageKey) ?? 0);

    // 恢复滚动逻辑
    if (savedScroll > 0) {
      const container = document.querySelector(containerSelector);
      if (container) {
        const observer = new MutationObserver(() => {
          const maxScroll = sc.scrollHeight - window.innerHeight;
          sc.scrollTo({
            top: Math.min(savedScroll, maxScroll),
            behavior: "auto",
          });
          observer.disconnect(); // 只执行一次
        });

        observer.observe(container, { childList: true, subtree: true });
      }
    }

    // 监听滚动保存位置
    const handleScroll = () => {
      sessionStorage.setItem(storageKey, String(sc.scrollTop));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [storageKey, containerSelector]);
}
