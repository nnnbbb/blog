"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";
import ArticleToc, { TocItem } from "../ArticleToc";
import { getTocItem } from "./TitleComponents";
import { getMarkdownComponents } from "./LMarkdownComponents";

interface LMarkdownProps {
  markdown: string;
  showToc?: boolean;
}


export default function LMarkdown({ markdown, showToc = false }: LMarkdownProps) {
  const { toc, components } = getTocItem()
  const [tocItems, setTocItems] = useState<TocItem[]>([]);


  useEffect(() => {
    if (showToc) setTocItems(toc);
  }, [markdown]);

  return (
    <div>
      <ArticleToc items={tocItems} />
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
        components={{
          ...getMarkdownComponents(),
          ...components,
        }}
      >
        {markdown}
      </ReactMarkdown>

    </div>
  );
}
