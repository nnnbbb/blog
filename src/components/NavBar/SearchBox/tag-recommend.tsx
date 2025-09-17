"use client";

import React from "react";

interface TagRecommendProps {
  tags: string[];
  maxItems?: number; // 最多显示多少个
  onSelect?: (tag: string) => void;
}
let selectedTags: string[] | null = null;

const TagRecommend: React.FC<TagRecommendProps> = ({
  tags,
  maxItems = 15,
  onSelect,
}) => {
  if (!tags || tags.length === 0) return null;

  // 随机选择 tags
  if (!selectedTags) {
    const shuffled = [...tags].sort(() => Math.random() - 0.5);
    selectedTags = shuffled.slice(0, maxItems);
  }

  const handleClick = (tag: string) => {
    onSelect?.(tag);
  };

  return (
    <div className="common-use-recommend">
      <div className="recommend-title">
        <span className="iconfont icon-tag"></span> &ensp;标签搜索
      </div>
      <div className="recommend-content-wrapper">
        {selectedTags.map((tag, idx) => (
          <div
            key={idx}
            className="recommend-item"
            onClick={() => handleClick(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagRecommend;
