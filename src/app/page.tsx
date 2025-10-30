"use client";

import { useEffect, useState } from "react";
import "vditor/dist/index.css";
import ArticleCard from "@/components/ArticleCard";
import WeatherCard from "@/components/WeatherCard";
import "./page.css";
import { Http } from "../utils/http";
import { AnimatePresence, motion } from "framer-motion";
import TopBlog from "../components/TopBlog";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

interface Article {
  id: number;
  title: string;
  description: string;
  tags: string[];
  img_url: string;
  adjustTime: string;
}
interface Weather {
  aqi: string;
  cityNameCn: string;
  cityNameEn: string;
  humidity: string;
  temperature: string;
  time: string;
  weather: string;
  wind: string;
}
const SCROLL_KEY = "HOME_PAGE_SCROLL_STORAGE_KEY";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [weather, setWeather] = useState<Weather>();
  useScrollRestoration(SCROLL_KEY, ".c");
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

    getWeather()
  }, []);

  const getWeather = () => {
    Http.get("thirdparty/get-weather-by-ip").then((res: any) => {
      setWeather(res)
    }).catch((err) => {
      console.error("获取天气失败", err);
    });
  }

  return (
    <div className={"home-container"}>
      <div className={"home-banner-container"}>
        <div className={"left"}>
          <div className={"c"}>
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

        {/* 侧边栏 */}
        <div className={"right"}>
          <div className="c" style={{ position: 'relative', height: '100%', minWidth: '380px' }}>
            <div className="scroll" style={{ position: 'sticky', top: '10px', display: 'block' }}>
              {/* 天气卡片 */}
              <WeatherCard
                city={`${weather?.cityNameCn ?? "??"} ${weather?.cityNameEn ?? "??"} `}
                temperature={weather?.temperature}
                condition={weather?.weather}
                wind={weather?.wind}
                humidity={weather?.humidity}
                airQuality={weather?.aqi}
              />

              {/* 置顶博客 */}
              <TopBlog />
            </div>

          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
