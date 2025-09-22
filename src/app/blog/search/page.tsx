"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import "./search.css"
import { Http } from "@/utils/http";
import { AnimatePresence, motion } from "framer-motion";
import { BlogItem } from "@/types/blog-item.interface";

const Search: React.FC = () => {
  const [articles, setArticles] = useState<BlogItem[]>([]);
  const searchParams = useSearchParams();
  const [total, setTotal] = useState(100);
  const [page, setPage] = useState(1);
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);
  const pageSize = 20;
  const q = searchParams.get("q") || "";
  const hasMore = articles.length < total;
  useEffect(() => {
    // 监听搜索关键词 q 的变化
    // 重置页码为第一页
    setPage(1);
    // 清空旧的数据
    setArticles([]);
  }, [q]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        if (articles.length < total) {
          setPage(prev => prev + 1);
        }
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [articles, total, hasMore]);

  useEffect(() => {
    Http.get<{ list: BlogItem[], total: number }>(
      `/blog/search`, {
      q: q,
      page: page,
      pageSize: pageSize,
    })
      .then((res) => {
        console.log(res)
        setTotal(res.total);
        setArticles(prev => page === 1 ? res.list : [...prev, ...res.list]);
      })
      .catch((err) => console.error("请求失败:", err));
  }, [page, q]);

  return (
    <section style={{ padding: 0 }}>
      <div style={{ minHeight: "1300px" }}>
        <div
          className="card-sub-title"
          style={{ display: "flex", fontSize: "24px", color: "black", flexWrap: "wrap" }}
        >
          搜索内容为{" "}
          <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            <div
              className="k-tag"
              style={{ fontSize: "18px", backgroundColor: "rgb(220, 124, 6)" }}
            >
              {q}
            </div>
          </div>{" "}
          的结果({total})
        </div>
        <br />
        <section style={{ padding: "5px" }}>
          <div className="common-displayer">
            <div className="">
              <div className="search-container">
                <AnimatePresence>
                  {articles.map((article, index) => (
                    <motion.div
                      className="article-wrapper"
                      key={`${article.id}-${index}`}
                      initial={{ opacity: 0, x: -50 }}  // 初始位置
                      animate={{ opacity: 1, x: 0 }}    // 入场动画
                      exit={{ opacity: 0, x: 50 }}      // 离场动画
                      transition={{ duration: 0.3 }}    // 可以顺序出现
                    >
                      <ArticleCard
                        id={article.id}
                        title={article.title}
                        description={article.summary.replace(/## .*\n/g, "")}
                        date={article.adjustTime}
                        imageUrl={article.imgUrl}
                        tags={article.tags}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={loadMoreRef} style={{ height: "40px" }} />
                {!hasMore && (
                  <div style={{ textAlign: "center", padding: "10px", color: "gray" }}>
                    已经到底了~
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Search;
