"use client";

import { useEffect, useState } from "react";
import "vditor/dist/index.css";
import ArticleCard from "@/components/ArticleCard";
import WeatherCard from "@/components/WeatherCard";
import "./page.css";
import { Http } from "../utils/http";
import { AnimatePresence, motion } from "framer-motion";

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
export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [weather, setWeather] = useState<Weather>();

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
    // @ts-ignore
    window.ipJson = function (data: any) {

      console.log(data)
      Http.get("thirdparty/get-weather-by-city", {
        city: data.city,
        cityCode: data.cityCode,

      }).then((res: any) => {
        setWeather(res)
      }).catch((err) => {
        console.error("获取天气失败", err);
      });
    };

    // 动态加载脚本
    const script = document.createElement("script");
    script.src = "//whois.pconline.com.cn/ipJson.jsp?callback=ipJson";
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      // @ts-ignore
      delete window.ipJson;
    };
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
          <div className="c" style={{ position: 'relative', height: '100%' }}>
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
              <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '80%'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ marginRight: '10px', fontSize: '1.2rem' }}>📌</span>
                  <h3 style={{ margin: '0', fontSize: '1rem' }}>置顶博客</h3>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>全网第一个 MCP 服务器一体化开发测试软件 OpenMCP 发布!</p>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#888', fontSize: '0.8rem' }}>
                    <span>Apr 13, 2025</span>
                  </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>闲聊式问答机器人状态机设计</p>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#888', fontSize: '0.8rem' }}>
                    <span>Jun 02, 2024</span>
                  </div>
                </div>

                <div>
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>EDL (Evidential Deep Learning) 原理与代码实现</p>
                </div>
              </div>
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
