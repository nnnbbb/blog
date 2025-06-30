import React from "react"
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import { getMarkdownComponents } from "./LMarkdownComponents";
import remarkMath from "remark-math";


interface LMarkdownProps {
  markdown: string;
}

export default function LMarkdown({ markdown }: LMarkdownProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      remarkPlugins={[remarkGfm, remarkMath]}
      components={getMarkdownComponents()}
    >
      {markdown}
    </ReactMarkdown>
  )
};
