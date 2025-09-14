"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./article-toc.module.css";

interface TocItem {
  id: string;
  title: string;
  level: number; // 控制缩进
}

interface ArticleTocProps {
  items: TocItem[];
}

export default function ArticleToc({ items }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (id: string) => {
    setActiveId(id);
    const el = document.querySelector(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const toc = (
    <div
      className={clsx(styles["float-article-tool-wrapper"], styles["no-selection"])}
      style={{
        position: "fixed",
        top: "100px",
        right: "20px",
        width: "250px",
        zIndex: 9999,
      }}
    >
      <div className={styles["category"]}>
        <div className={styles["scrollbar"]}>
          <div className={styles["category-title-container"]}>
            <a href="#category-0" className={styles["category-title"]}>
              {/* 保持原有 class */}
              <span className="iconfont icon-category"></span> &ensp;文章目录
            </a>
          </div>

          <div
            className={styles["scrollbar"]}
            style={{ maxHeight: "50vh", overflowY: "scroll" }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={clsx(
                  styles["category-item-container"],
                  activeId === item.id && styles["active"]
                )}
                style={{ marginLeft: `${item.level * 22}px` }}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 确保只在浏览器环境挂载到 body
  if (mounted) {
    return createPortal(toc, document.body);
  }
  return null;
}
