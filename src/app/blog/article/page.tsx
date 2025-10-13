"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import LMarkdown from "@/components/LMarkdown";
import readingTime from "reading-time";
import wordCount from "word-count";
import { Http } from "@/utils/http";
import { decodeGzipBase64 } from "@/utils/compression";
import styles from "./article.module.css";
import TagList from "./tag-list";
import { toast } from "@/components/Toast";
import { useAuth } from "@/hooks/useAuth";

interface IArticle {
  title?: string;
  content?: string;
  imgUrl?: string;
  tags: string[];
  adjustTime?: string;
}

export default function Article() {
  const [markdown, setMarkdown] = useState("");
  const [time, setTime] = useState("");
  const [stats, setStats] = useState({ words: 0, time: 0 });
  const [article, setArticle] = useState<IArticle>();
  const [loaded, setLoaded] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [isLogin, setIsLogin] = useAuth();
  const [showActions, setShowActions] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const seq = searchParams?.get("seq");

  const fetchBlog = () => {
    Http.get("/blog/fetch-blog-by-seq", { seq })
      .then((res: IArticle) => {
        setArticle(res);
        setTime(dayjs(res.adjustTime).format("MMM DD, YYYY"));
        const content = decodeGzipBase64(res.content!);
        setMarkdown(content);
        setTags(res.tags);
        const wordStats = wordCount(content);
        const timeStats = readingTime(content);
        setStats({
          words: wordStats,
          time: Math.ceil(timeStats.minutes),
        });
        setLoaded(true);
      })
      .catch((err) => {
        console.error("获取文章失败", err);
      });
  };

  const deleteBlog = () => {
    if (!seq) return;
    Http.delete(`/blog/${seq}`).then(() => {
      toast("文章删除成功！");
      router.push("/");
    });
  };

  useEffect(() => {
    if (!seq) return;
    fetchBlog();
  }, [seq]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AnimatePresence>
        {loaded && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles["dustblog-container"]}>
              {/* ===== 标题部分 ===== */}
              <div
                className={styles["dustblog-title"]}
                style={{ position: "relative" }}
              >
                <h1
                  onClick={() => {
                    if (isLogin) setShowActions(!showActions);
                  }}
                  style={{
                    cursor: isLogin ? "pointer" : "default",
                    userSelect: "none",
                  }}
                >
                  {article?.title}
                </h1>

                {/* ===== 编辑/删除按钮 ===== */}
                {isLogin && showActions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "flex",
                      gap: "10px",
                      // position: "absolute",
                      top: "100%",
                      left: 0,
                      marginTop: "10px",
                    }}
                  >
                    <button
                      className="primary"
                      onClick={() => router.push(`/markdown?seq=${seq}`)}
                    >
                      <span className="iconfont icon-edit-circle"></span> 编辑
                    </button>
                    <button onClick={deleteBlog}>
                      <span className="iconfont icon-trash-bin"></span> 删除
                    </button>
                  </motion.div>
                )}
              </div>

              {/* ===== 字数和时间 ===== */}
              <div
                className={`${styles["reading-time"]} ${styles["dustblog-body"]}`}
              >
                <div>
                  <span
                    className={`${styles["iconfont"]} iconfont icon-read`}
                  />
                  <span className="TagTag">
                    本文字数 <span className="underline">{stats.words}</span>
                  </span>
                  <span className="sp">&nbsp;-&nbsp;</span>
                  <span>
                    阅读时间约为{" "}
                    <span className="underline">{stats.time} 分钟</span>
                  </span>
                </div>
                <div>
                  <span
                    className={`${styles["iconfont"]} iconfont icon-write`}
                  />
                  <span>{time}</span>
                </div>
              </div>

              {/* ===== 封面图 ===== */}
              {article?.imgUrl && (
                <div className={styles["dustblog-cover"]}>
                  <div className="loading-image-container">
                    <div className={styles["image-container"]}>
                      <img className="banner-image" src={article.imgUrl} />
                    </div>
                  </div>
                </div>
              )}

              <hr className={styles["hr"]} />

              {/* ===== 正文 ===== */}
              <section className={`${styles["dustblog-body"]} markdown`}>
                <LMarkdown markdown={markdown} showToc={true} />
              </section>

              {/* ===== 标签 ===== */}
              <TagList tags={tags} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
