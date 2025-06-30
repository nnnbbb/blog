"use client";

import { useEffect } from "react";
import "vditor/dist/index.css";
import ArticleCard from "@/components/ArticleCard";
import WeatherCard from "@/components/WeatherCard";
import styles from "./page.module.css";

export default function Home() {
  useEffect(() => {
    // Clear the effect
    return () => {
    };
  }, []);

  return (
    <div className={styles['home-container']}>
      <div className={styles["home-banner-container"]}>
        <div className={styles["left"]}>
          {/* 文章卡片1 */}
          <ArticleCard
            title=" 🚀 知乎圈子「OpenMCP 博物馆」策划书"
            content="前言有幸收到知乎的邀请，成立一个有关MCP话题的「知乎圈子」，下面记录的就是圈子的一些规则和想法。"
            date="May 28, 2025 17:41"
            tags={["策划", "圈子", "mcp"]}
          />

          {/* 文章卡片2 */}
          <ArticleCard
            title="优雅地使用C++部署你的PyTorch推理模型（一）LibTorch的安装与基本使用"
            content="三年前写的文章了，今天用crawl4ai转成markdown被到我的网站上来了-[来自专栏:深度学习工程化]..."
            date="May 26, 2025 13:47"
            tags={["老文章", "pytorch", "c++", "python"]}
          />
          <ArticleCard
            title="优雅地使用C++部署你的PyTorch推理模型（一）LibTorch的安装与基本使用"
            content="三年前写的文章了，今天用crawl4ai转成markdown被到我的网站上来了-[来自专栏:深度学习工程化]..."
            date="May 26, 2025 13:47"
            tags={["老文章", "pytorch", "c++", "python"]}
          />
          <ArticleCard
            title="优雅地使用C++部署你的PyTorch推理模型（一）LibTorch的安装与基本使用"
            content="三年前写的文章了，今天用crawl4ai转成markdown被到我的网站上来了-[来自专栏:深度学习工程化]..."
            date="May 26, 2025 13:47"
            tags={["老文章", "pytorch", "c++", "python"]}
          />

          {/* 这里可以添加更多文章卡片 */}
        </div>

        {/* 侧边栏 */}
        <div className={styles["right"]}>
          <div className="c" style={{ position: 'relative', height: '100%' }}>
            <div className="scroll" style={{ position: 'sticky', top: '10px', display: 'block' }}>
              {/* 天气卡片 */}
              <WeatherCard
                city="深圳 shenzhen"
                temperature="31.3°"
                condition="多云"
                wind="南风 1级"
                humidity="67%"
                airQuality="28 优"
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
