"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./drawer.module.css";
import { useMounted } from "@/hooks/useMounted";

interface DrawerProps {
  visible: boolean;
  width?: number;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Drawer({
  visible,
  width = 450,
  onClose,
  children,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  useEffect(() => {
    if (!visible) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, onClose]);
  if (!mounted) return null; // 🚀 避免 SSR 阶段执行 document


  return createPortal(
    <div
      ref={drawerRef}
      className={styles['drawer-container']}
      style={{
        width: width,
        right: visible ? 0 : -width,
      }}
    >
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <strong>文章评论</strong> */}
        {/* <button onClick={onClose} style={{ cursor: "pointer" }}>
          关闭
        </button> */}
      </div>
      <div style={{ padding: "16px" }}>{children}</div>
    </div>,
    document.body,
  );
}
