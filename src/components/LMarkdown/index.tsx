"use client";

import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface LMarkdownProps {
  markdown: string;
  headingIdPrefix?: string; // 可选前缀，避免 id 冲突
  onTocGenerated?: (toc: TocItem[]) => void; // TOC 回调
}

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export default function LMarkdown({ markdown, headingIdPrefix = "category-", onTocGenerated }: LMarkdownProps) {
  const toc: TocItem[] = [];
  let headingIndex = 0;

  const components = {
    h2: ({ children, ...props }: any) => {
      headingIndex++;
      const title = children.join ? children.join("") : children;
      const id = `#${headingIdPrefix}${headingIndex}`;
      toc.push({ id, title, level: 0 });
      return <h2 id={id.slice(1)} {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }: any) => {
      headingIndex++;
      const title = children.join ? children.join("") : children;
      const id = `#${headingIdPrefix}${headingIndex}`;
      toc.push({ id, title, level: 1 });
      return <h3 id={id.slice(1)} {...props}>{children}</h3>;
    },
    h4: ({ children, ...props }: any) => {
      headingIndex++;
      const title = children.join ? children.join("") : children;
      const id = `#${headingIdPrefix}${headingIndex}`;
      toc.push({ id, title, level: 2 });
      return <h4 id={id.slice(1)} {...props}>{children}</h4>;
    },
  };

  useEffect(() => {
    if (onTocGenerated) onTocGenerated(toc);

  }, [markdown]);

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      remarkPlugins={[remarkGfm, remarkMath]}
      components={components}
    >
      {markdown}
    </ReactMarkdown>
  );
}
