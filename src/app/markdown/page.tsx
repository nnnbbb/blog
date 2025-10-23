'use client';
import React, { useEffect, useState } from 'react';
import MarkdownEditor from './markdown-editor';
import PublishForm from './publish-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Http } from '@/utils/http';
import { decodeGzipBase64 } from '@/utils/compression';
import { toast } from '../../components/Toast';

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);

  const searchParams = useSearchParams();
  const seq = searchParams?.get("seq");
  const router = useRouter();

  const fetchBlog = async () => {
    let res = await Http.get("/blog/fetch-blog-by-seq", { seq })
    const content = decodeGzipBase64(res.content!);
    setMarkdown(content)
    setSelectedTags(res.tags)
    setTitle(res.title)
    setImgUrl(res.imgUrl)
    setIsPrivate(res.isPrivate ?? false)
  }

  const publishArticle = async () => {
    if (!markdown.trim()) {
      toast("文章内容不能为空！");
      return;
    }
    if (!title.trim()) {
      toast("请填写文章标题！");
      return;
    }
    if (!imgUrl.trim()) {
      toast("请填写封面图片链接！");
      return;
    }

    try {
      const body = {
        title,
        content: markdown,
        tags: selectedTags,
        imgUrl,
        isPrivate: isPrivate,
      }
      let res
      if (seq === null) {
        res = await Http.post("/blog", body);
      } else {
        res = await Http.put(`/blog/${seq}`, { id: seq, ...body });
      }
      if (res) {
        setTitle("");
        setImgUrl("");
        setSelectedTags([]);
        toast('文章发布成功！');
        router.push(`/blog/article?seq=${res.id}`);
      }

    } catch (err) {
      console.error("发布失败", err);
      toast("发布失败，请稍后重试！");
    }
  };

  useEffect(() => {
    if (!seq) return;
    fetchBlog();
  }, [seq])

  return (
    <div className="flex flex-col w-full min-h-screen">
      <MarkdownEditor markdown={markdown} setMarkdown={setMarkdown} />
      <hr />
      <PublishForm
        markdown={markdown}
        title={title}
        setTitle={setTitle}
        imgUrl={imgUrl}
        setImgUrl={setImgUrl}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        publishArticle={publishArticle}
        isPrivate={isPrivate}
        setIsPrivate={setIsPrivate}
      />
    </div>
  );
}
