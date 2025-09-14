"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import LMarkdown, { TocItem } from "@/components/LMarkdown";
import ArticleToc from "@/components/ArticleToc";
import readingTime from "reading-time";
import wordCount from "word-count";
import { Http } from "@/utils/http";
import { decodeGzipBase64 } from "@/utils/compression";
import styles from "./article.module.css";
import TagList from "./tag-list";

interface IArticle {
  title?: string;
  content?: string;
  img_url?: string;
  tags: string[];
  adjust_time?: string;
}

export default function Article() {
  const [markdown, setMarkdown] = useState("");
  const [time, setTime] = useState("");
  const [stats, setStats] = useState({ words: 0, time: 0 });
  const [article, setArticle] = useState<IArticle>();
  const [loaded, setLoaded] = useState(false);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const seq = searchParams?.get("seq");

  useEffect(() => {
    if (!seq) return;

    Http.get("/blog/fetch-blog-by-seq", { seq })
      .then((res: IArticle) => {
        setArticle(res);
        setTime(dayjs(res.adjust_time).format("MMM DD, YYYY"));
        const content = decodeGzipBase64(res.content!);
        setMarkdown(content);
        console.log(tags)
        setTags(res.tags)
        const wordStats = wordCount(content);
        const timeStats = readingTime(content);
        setStats({
          words: wordStats,
          time: Math.ceil(timeStats.minutes),
        })

        setLoaded(true) // 数据加载完成后触发动画
      })
      .catch(err => {
        console.error('获取文章失败', err)
      })
  }, [seq])

  return (
    <div style={{ minHeight: "100vh" }}>
      <ArticleToc items={tocItems} />

      <AnimatePresence>
        {loaded && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles["dustblog-container"]}>
              <div className={styles["dustblog-title"]}>
                <h1>{article?.title}</h1>
              </div>
              <div className={`${styles["reading-time"]} ${styles["dustblog-body"]}`}>
                <div>
                  <span className={`${styles["iconfont"]} iconfont icon-read`} />
                  <span className="TagTag">
                    本文字数 <span className="underline">{stats.words}</span>
                  </span>
                  <span className="sp">&nbsp;-&nbsp;</span>
                  <span>
                    阅读时间约为 <span className="underline">{stats.time} 分钟</span>
                  </span>
                </div>
                <div>
                  <span className={`${styles["iconfont"]} iconfont icon-write`} />
                  <span>{time}</span>
                </div>
              </div>

              {article?.img_url && (
                <div className={styles["dustblog-cover"]}>
                  <div className="loading-image-container">
                    <div className={styles["image-container"]}>
                      <img className="banner-image" src={article.img_url} />
                    </div>
                  </div>
                </div>
              )}

              <hr className={styles["hr"]} />

              <section className={`${styles["dustblog-body"]} markdown`}>
                <LMarkdown markdown={markdown} onTocGenerated={setTocItems} />
              </section>
              <TagList tags={tags} />

            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
