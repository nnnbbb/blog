"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ArticleCard from "../../../components/ArticleCard";
import "./search.css"
import { Http } from "../../../utils/http";
import { Article } from "../../../types/article.interface";
import { AnimatePresence, motion } from "framer-motion";

const Search: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  useEffect(() => {
    Http.get("/home/get-news")
      .then((res: any) => {
        if (res) {
          setArticles(res);
        }
      })
      .catch((err) => {
        console.error("获取文章失败", err);
      });

  }, []);

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
          的结果(19)
        </div>
        <br />
        <section style={{ padding: "5px" }}>
          <div className="common-displayer">
            <div className="">
              <div className="search-container">
                <AnimatePresence>
                  {articles.map((article) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -50 }}  // 初始位置
                      animate={{ opacity: 1, x: 0 }}    // 入场动画
                      exit={{ opacity: 0, x: 50 }}      // 离场动画
                      transition={{ duration: 0.3 }}    // 可以顺序出现
                    >
                      <ArticleCard
                        id={article.id}
                        title={article.title}
                        description={article.description.replace(/## .*\n/g, "")}
                        date={article.adjustTime}
                        imageUrl={article.img_url}
                        tags={article.tags}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Search;
