'use client';

import React, { useEffect, useRef, useState } from 'react';
import LMarkdown from '@/components/LMarkdown';
import styles from './markdown.module.css';

interface MarkdownEditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

export default function MarkdownEditor({ markdown, setMarkdown }: MarkdownEditorProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  // 同步 textarea 高度
  useEffect(() => {
    if (!previewRef.current) return;
    setHeight(previewRef.current.offsetHeight);
  }, [markdown]);

  return (
    <div className="flex justify-between w-full flex-grow">
      {/* 编辑器 */}
      <div className="w-1/2 border-r border-gray-300 p-4">
        <textarea
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="在这里输入 Markdown 文本..."
          style={{
            width: "100%",
            height: height ? `${height}px` : "auto",
            resize: "both",
          }}
          className={styles['my-textarea']}
        />
      </div>

      {/* 预览 */}
      <div
        ref={previewRef}
        className="w-1/2 p-6 overflow-auto markdown"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(128, 30, 255, 0.3) white',
        }}
      >
        <div className="w-full">
          {markdown.trim() ? (
            <LMarkdown markdown={markdown} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <span className={`iconfont icon-empty`} style={{ fontSize: '200px', color: 'rgb(128, 30, 255)' }}></span>
              <div className="mt-4">你貌似没有写什么</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
