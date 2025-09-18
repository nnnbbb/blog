"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { formatDate, validDate } from "@/utils/time";
import "./article-card.css"

interface ArticleCardProps {
  id: number;
  title: string;
  description: string;
  date?: string;
  tags?: string[];
  imageUrl?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  title,
  description,
  date = "未知日期",
  tags = [],
  imageUrl,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/blog/article?seq=${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="content article-card-container hover-effect-shadow-border">
      <div className="blog">
        <div>
          <h2>
            <span className="iconfont icon-blog"></span>
            <span>
              {title}
            </span>
          </h2>
          <span className="description">
            {description}
          </span>
        </div>
        <div className="small-width image-container">
          <div className="image">
            <div className="loading-image-container">
              <div className="image-container display-image-wrapper">
                <img
                  src={imageUrl}
                  className="paper-left-image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="meta">
          {validDate(date) &&
            <span className={'date'}>
              <span className="iconfont icon-history"></span>
              <span>{formatDate(date)}</span>
            </span>
          }
          {tags.length > 0 && (
            <div className="tags-container" >
              <span className='iconfont icon-tag'></span>
              {tags.map((tag, index) => (
                <span key={index} className={'tag'}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="large-width image-container">
        <div className="image">
          <div className="loading-image-container">
            <div className="image-container display-image-wrapper">
              <img
                src={imageUrl}
                className="paper-left-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
