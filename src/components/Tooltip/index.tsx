"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./tooltip.module.css";

interface TooltipProps<T extends HTMLElement = HTMLElement> {
  targetRef: React.RefObject<T | null>;
  show: boolean;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ targetRef, show, children }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });

  // 计算位置
  const updatePosition = () => {
    if (targetRef.current && tooltipRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      const tooltipWidth = tooltipRef.current.offsetWidth;
      const tooltipHeight = tooltipRef.current.offsetHeight;

      setPos({
        left: rect.left + scrollX + rect.width / 2 - tooltipWidth / 2,
        top: rect.top + scrollY - tooltipHeight - 5,
      });
    }
  };

  // 当显示时或窗口大小变化时更新
  useLayoutEffect(() => {
    if (show) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      return () => window.removeEventListener("resize", updatePosition);
    }
  }, [show]);

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          ref={tooltipRef}
          key="tooltip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.tooltip}
          style={{
            position: "absolute",
            left: pos.left,
            top: pos.top,
            cursor: "pointer",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Tooltip;
