import { useEffect, useState } from "react";
import { Article } from "../../types/article.interface";
import { Http } from "../../utils/http";
import { formatDate } from "../../utils/time";


export default function TopBlog() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    Http.get<Article[]>("/home/get-news")
      .then((res) => {
        if (res) {
          setArticles(res.slice(0, 3));
        }
      })
      .catch((err) => {
        console.error("获取文章失败", err);
      });

  }, []);

  return <div className="top-blog home-banner-right">
    <h2>
      <span className="iconfont icon-top">置顶博客</span>
    </h2>
    {articles.map(item => {
      return <div className="blog">
        <h2 className="hover-effect-1">
          {item.title}
        </h2>
        <div className="date">
          <span className="iconfont icon-history" />
          <span>{formatDate(item.adjustTime)}</span>
        </div>
      </div>
    })}
  </div>
}
