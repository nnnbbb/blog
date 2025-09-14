"use client";

import React, { useRef, useState } from "react";
import Tooltip from "@/components/Tooltip/Tooltip";

interface BlogCardProps {
  title: string;
  image: string;
  tags: string[];
  modifiedAt: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, image, tags, modifiedAt }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="col-4 col-12-medium" style={{ position: "relative" }}>
      <div className="paper-card">
        <div className="paper-card-inner">
          <div className="loading-image-container">
            <div className="image-container display-image-wrapper">
              <img src={image} className="paper-left-image" />
            </div>
          </div>
        </div>

        <div className="block-text">
          {/* 标题 */}
          <div
            ref={titleRef}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="card-sub-title blog-title"
          >
            {title}
          </div>

          {/* 标签 */}
          <div className="home-article-tags">
            <span className="iconfont icon-tag"></span>
            {tags.map((tag, idx) => (
              <div key={idx} style={{ margin: "5px", cursor: "pointer" }}>
                <div
                  className="k-tag"
                  style={{ fontSize: "13px", backgroundColor: "var(--main-color)" }}
                >
                  {tag}
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: "0.9rem", marginTop: "5px" }}>
            Modify {modifiedAt}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <Tooltip targetRef={titleRef} show={showTooltip}>
        {title}
      </Tooltip>
    </div>
  );
};

export default BlogCard;
