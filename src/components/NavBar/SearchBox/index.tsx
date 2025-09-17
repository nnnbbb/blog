"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HistoryRecommend, { STORAGE_HISTORY_KEY } from "./history-recommend";
import TagRecommend from "./tag-recommend";
import "./search-box.css";
import clsx from "clsx";
import { Http } from "@/utils/http";

const SearchBox: React.FC = () => {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 初始化历史
  useEffect(() => {
    const local = localStorage.getItem(STORAGE_HISTORY_KEY);
    if (local) setHistory(JSON.parse(local));
  }, []);

  // 获取标签
  const fetchTags = async () => {
     Http.get<string[]>("/blog/get-tags").then(res => setTags(res));
  };
  useEffect(() => {
    fetchTags();
  }, []);

  // 搜索逻辑
  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    if (!history.includes(value)) {
      // 更新历史
      const newHistory = [value, ...history.filter(h => h !== value)].slice(0, 20);
      setHistory(newHistory);
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(newHistory));
    }
    Http.get("/blog/search", { q: value }).then(res => console.log(res));
  };

  // 回车搜索
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(inputValue);
    }
  };

  // 点击外部关闭推荐列表
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-box" ref={containerRef}>
      <div className={clsx("search-box-container", focused && "focus")} tabIndex={0} style={{ outline: 0 }}>
        {/* 搜索类型 */}
        <div className="search-type-container">
          <div className="current-search-type">
            <span className="iconfont icon-blog"></span>
          </div>
          <div className="current-search-type-arrow">
            <span className="iconfont icon-arrow-down"></span>
          </div>
          <div className="search-type-popover" style={{ display: "none" }}>
            <div className="item focus">
              <div className="iconfont icon-blog">&ensp;博客</div>
              <span></span>
            </div>
            <div className="item">
              <div className="iconfont icon-guitar">&ensp;音乐</div>
              <span></span>
            </div>
          </div>
        </div>

        <span className="search-spliter"></span>

        {/* 输入框 + 放大镜 */}
        <div className="search-input-container">
          <input
            type="text"
            className="search-box"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={handleKeyDown}
          />
          <div className="search-box-icon" onClick={() => handleSearch(inputValue)}>
            <span className={clsx("iconfont", "icon-search", focused && "focus")}></span>
          </div>

          {/* 推荐列表动画 */}
          <AnimatePresence>
            {focused && (
              <motion.div
                className="search-recommend-container"
                // 从右上角到左下角开始
                initial={{ opacity: 0, scale: 0, originX: 1, originY: 0 }}
                // 放大到正常大小
                animate={{ opacity: 1, scale: 1, originX: 0.3, originY: 0.3 }}
                // 从左下角到右上角消失
                exit={{ opacity: 0, scale: 0, originX: 1, originY: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* 历史搜索 */}
                <HistoryRecommend
                  history={history}
                  setHistory={setHistory}
                  onSelect={(val) => {
                    setInputValue(val);
                    handleSearch(val); // 点击历史也触发搜索
                  }}
                />

                <br />

                {/* 标签搜索 */}
                <TagRecommend
                  tags={tags}
                  onSelect={(val) => {
                    handleSearch(val)
                    setFocused(false); // 点击标签关闭推荐列表
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
