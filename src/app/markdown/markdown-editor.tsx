'use client';

import React, { useEffect, useRef, useState } from 'react';
import LMarkdown from '@/components/LMarkdown';
import styles from './markdown.module.css';
import { useIsMobile } from '@/hooks/useIsMobile';
import clsx from 'clsx';

interface MarkdownEditorProps {
  markdown: string;
  setMarkdown: (value: string) => void;
}

export default function MarkdownEditor({ markdown, setMarkdown }: MarkdownEditorProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [showPreview, setShowPreview] = useState(false);
  const isMobile = useIsMobile();

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  // 检测是否为移动端

  // 同步 textarea 高度
  useEffect(() => {
    if (!previewRef.current) return;
    setHeight(previewRef.current.offsetHeight);
  }, [markdown]);

  return (
    <div className="flex flex-col w-full flex-grow">
      {/* 移动端切换按钮 */}
      {isMobile && (
        <div className="flex justify-center gap-4 p-3 border-b border-gray-200">
          <button
            onClick={() => setShowPreview(false)}
            className={!showPreview ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'}
          >
            编辑
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className={showPreview ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'}
          >
            预览
          </button>
        </div>
      )}

      {/* 内容区域 */}
      <div
        className={clsx(
          isMobile ? 'flex-col' : 'flex-row justify-between',
          'flex',
          'w-full',
          'flex-grow',
        )}
      >
        {/* 编辑器 */}
        {(!isMobile || !showPreview) && (
          <div
            className={isMobile ? 'w-full' : 'w-1/2'}
          >
            <textarea
              value={markdown}
              onChange={handleMarkdownChange}
              placeholder="在这里输入 Markdown 文本..."
              style={{
                width: '100%',
                height: height ? `${height}px` : 'auto',
                resize: 'both',
              }}
              className={styles['my-textarea']}
            />
          </div>
        )}

        {/* 预览 */}
        {(!isMobile || showPreview) && (
          <div
            ref={previewRef}
            className={`${isMobile ? 'w-full' : 'w-1/2'} p-6 overflow-auto markdown`}
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
                  <span
                    className={`iconfont icon-empty`}
                    style={{ fontSize: '200px', color: 'rgb(128, 30, 255)' }}
                  ></span>
                  <div className="mt-4">你貌似没有写什么</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
