"use client";

import React, { useEffect, useState } from "react";

interface HistoryRecommendProps {
  history: string[]
  setHistory: React.Dispatch<React.SetStateAction<string[]>>
  // 最大历史条数
  maxItems?: number;
  // 点击历史条目回调
  onSelect?: (item: string) => void;
}

export const STORAGE_HISTORY_KEY = "search.history";

const HistoryRecommend: React.FC<HistoryRecommendProps> = ({
  history,
  setHistory,
  maxItems = 15,
  onSelect,
}) => {
  // 初始化读取 localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_HISTORY_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setHistory(parsed);
      } catch (e) {
        console.error("Failed to parse search history:", e);
      }
    }
  }, []);

  // 点击历史条目
  const handleClick = (item: string) => {
    if (onSelect) onSelect(item);
    if (!history.includes(item)) {

      // 更新历史
      const newHistory = [item, ...history.filter((h) => h !== item)].slice(
        0,
        maxItems
      );
      setHistory(newHistory);
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(newHistory));
    }
  };

  if (history.length === 0) return null;

  return (
    <div className="history-recommend">
      <div className="recommend-title">
        <span className="iconfont icon-history"></span> &ensp; 历史搜索
      </div>
      <div>
        <div className="recommend-content-wrapper">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="recommend-item"
              onClick={() => handleClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryRecommend;
