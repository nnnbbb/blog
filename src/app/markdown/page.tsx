'use client';
import React, { useState } from 'react';
import MarkdownEditor from './markdown-editor';
import PublishForm from './publish-form';

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState("");

  return (
    <div className="flex flex-col w-full min-h-screen">
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
      <hr />
      <PublishForm markdown={markdown} />
    </div>
  );
}
