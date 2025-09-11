'use client';

import React, { useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';

type ToastItem = { id: number; message: string; duration: number };

let toastId = 0;
let rootInstance: Root | null = null;
let container: HTMLElement | null = null;
let setToasts: ((toasts: ToastItem[]) => void) | null = null;
let toastsList: ToastItem[] = [];

function ToastContainer() {
  const [toasts, _setToasts] = useState<ToastItem[]>(toastsList);
  setToasts = _setToasts;

  useEffect(() => {
    toastsList = toasts;
  }, [toasts]);

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: '#8050FF',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              marginBottom: '10px',
            }}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * 显示 toast
 */
export function toast(message: string, duration = 2000) {
  if (typeof window === 'undefined') return;

  // 创建容器
  if (!container) {
    container = document.createElement('div');
    document.body.appendChild(container);
    rootInstance = createRoot(container);
    rootInstance.render(<ToastContainer />);
  }

  const id = toastId++;
  const newToast: ToastItem = { id, message, duration };
  toastsList.push(newToast);
  setToasts && setToasts([...toastsList]);

  // 定时销毁
  setTimeout(() => {
    toastsList = toastsList.filter((t) => t.id !== id);
    setToasts && setToasts([...toastsList]);
  }, duration);
}
