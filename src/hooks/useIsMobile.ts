import { useEffect, useState } from "react";

/**
 * 自适应检测当前是否为移动端（宽度 < 768px）
 * @returns boolean - 是否为移动端
 */
export function useIsMobile(maxWidth: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < maxWidth);

    checkMobile(); // 初始化检测
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
}
