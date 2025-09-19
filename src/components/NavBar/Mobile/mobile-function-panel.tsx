"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export interface DropdownItem {
  title: string;
  href: string;
  icon?: string;
}

export interface NavItemType {
  title: string;
  href: string;
  icon: string;
  dropdown?: DropdownItem[];
}

interface MobileFunctionPanelProps {
  navItems: NavItemType[];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileFunctionPanel({
  navItems,
  show,
  setShow,
}: MobileFunctionPanelProps) {
  const [activeItem, setActiveItem] = useState("首页");
  const router = useRouter();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="mobile-function-panel"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ originY: 0.5 }}
        >
          <span
            onClick={() => setShow(!show)}
            className="iconfont icon-back back-btn"
          >
            返回
          </span>

          {navItems.map((item) => (
            <div
              key={item.title}
              className={clsx(
                "collapse-item-container",
                "navigation-item",
                `${activeItem === item.title ? "focus" : ""}`
              )}
              onClick={() => {
                router.push(item.href)
                setActiveItem(item.title)
              }}
            >
              <div className="collapse-content-item">
                <div className="collapse-item-icon">
                  <span className={`iconfont ${item.icon}`}></span>
                </div>
                <div className="collapse-item-text">{item.title}</div>
                {item.dropdown && (
                  <div className="collapse-item-arrow" aria-expanded="false">
                    <span className="iconfont icon-arrow-down"></span>
                  </div>
                )}
              </div>

              {item.dropdown && (
                <div style={{ display: "none" }}>
                  <div className="collapse-item-content">
                    <div className="other-page-container">
                      {item.dropdown.map((sub) => (
                        <div key={sub.title}>
                          <div className="page-item">
                            {sub.icon && (
                              <span className={`iconfont ${sub.icon}`}></span>
                            )}{" "}
                            &ensp;
                            {sub.title}
                          </div>
                          <hr style={{ margin: 0 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

