'use client'

import React, { useEffect, useState } from 'react'
import styles from './article.module.css'
import LMarkdown from '@/components/LMarkdown';
import readingTime from 'reading-time';
import wordCount from 'word-count';

const defaultTitle = `无法通过 openai 库访问 gemini？这不是你的错—— openai 协议访问 gemini 调试日志`

const defaultContent = `

## 前言

最近在给 openmcp 做 gemini 的适配，可给我折腾坏了，遇到两个大坑，看得出来 google 对于 gemini 非常不上心呀！

起因是这样的，我的用户反应 openmcp 无法使用 gemini，我就光速注册了一个账号测试，结果发现确实不行，然后我就调试，发现 openai 这个库卡住了。幽默 gemini，官网上的 javascript demo 全部失效。非常好文档，使我亚托莉爆炸。

<div align=center>
<img src="https://pic4.zhimg.com/80/v2-a218b99617be787e214cd9b809c5e61d_1440w.webp" style="width: 100%;"/>
</div>

经过层层调试，我甚至还把 openai-node 的源代码看了一遍，我发现了问题所在：openai 默认采用 fetch 来进行 post 请求获取 SSE 响应，但是 fetch 对于 SSE 响应的处理似乎存在问题，具体问题是什么我不知道，但是换成 axios 就可以正常获得 SSE 响应了。

> 这个期间我尝试了ky, cross-fetch, ofetch, redaxios 等库，不行，全都会卡住。

除此之外，openai 库还会为请求附带如下的请求头：

\`\`\`bash
'User-Agent': 'OpenAI/JS 5.0.1'
\`\`\`

通过阅读 openai-node 源代码，我发现了 openai 这个库给了一个接口，可以自定义网络请求的处理逻辑，但是有一个要求：返回值必须是一个 fetch 原生的 Response 对象，于是有了这篇文章，我们需要把 axios 进行封装，使得它的返回值可被识别为一个 Response 对象（需要特别支持 SSE 的响应）。也就是我们需要实现一个 axios 的 adapter。

---

## axios adapter

基本实现比较简单，我不解释了，直接贴代码了：

\`\`\`typescript

/**
 * @description 主函数 - 用 axios 实现 fetch
 */
export async function axiosFetch(input: any, init: any, requestOption: { proxyServer?: string } = {}): Promise<any> {
  const axiosConfig = adaptRequestOptions(input, init);

  const {
    proxyServer = ''
  } = requestOption;

  if (proxyServer) {
    const proxyAgent = new HttpsProxyAgent(proxyServer);
    axiosConfig.httpsAgent = proxyAgent;
    axiosConfig.httpAgent = proxyAgent;
  }

  try {
    const response = await axios(axiosConfig) as FetchOptions;
    return adaptResponse(response);
  } catch (error: any) {
    if (error.response) {
      return adaptResponse(error.response);
    }
    throw error;
  }
}
\`\`\`

---

## 在 openai 中替换原本的网络请求

实现完成 axios adapter 后，我们只需要在 openai 这个库中通过 fetch 参数来自定义网络请求行为即可：

\`\`\`typescript
import { OpenAI } from "openai";

async function askLlm() {
  // ... existing code ...

  const client = new OpenAI({
    baseURL,
    apiKey,
    fetch: async (input: string | URL | Request, init?: RequestInit) => {

      console.log('openai fetch begin, proxyServer:', proxyServer);

      if (model.startsWith('gemini') && init) {
        // 该死的 google
        init.headers = {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer ${'apiKey'}\`
        }
      }

      return await axiosFetch(input, init, { proxyServer });
    }
  });

  // ... existing code ...
}
\`\`\`
最终，我也是成功支持了 gemini 的使用，难怪大部分厂商都选择不去支持 gemini，gemini 的 openai 适配做得确实乏善可陈呀 lol

最后贴一张 openmcp 的成功运行截图

<div align=center>

<img src="https://pic1.zhimg.com/80/v2-38be51e4055636abdece3be4a1cb2df2_1440w.png" style="width: 100%;"/>
</div>

欢迎大家为 openmcp 点 star：[LSTM-Kirigaya/openmcp-client](https://github.com/LSTM-Kirigaya/openmcp-client)

这是 [openmcp 官方文档](https://kirigaya.cn/openmcp/)

`
interface ArticleProps {
  title?: string;
  content?: string;
}
export default function Article({ title: initialTitle = defaultTitle, content = defaultContent }: ArticleProps) {
  const [markdown, setMarkdown] = useState(content);
  const [title, setTitle] = useState(initialTitle);
  const [stats, setStats] = useState({ words: 0, time: 0 });

  useEffect(() => {
    const wordStats = wordCount(content);
    const timeStats = readingTime(content);
    setStats({
      words: wordStats,
      time: Math.ceil(timeStats.minutes),
    });
  }, [content]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <section>
        <div className={styles['dustblog-container']}>
          <div className={styles["dustblog-title"]}>
            <h1 id="category-0">{title}</h1>
          </div>
          <div className={`${styles["reading-time"]} ${styles["dustblog-body"]}`}>
            <div>
              <span className={`${styles["iconfont"]} iconfont icon-read`} />
              <span className="TagTag">本文字数 <span className="underline">{stats.words}</span></span><span className="sp">&nbsp;-&nbsp;</span>
              <span>阅读时间约为 <span className="underline">{stats.time} 分钟</span></span>
            </div>
            <div>
              <span className={`${styles["iconfont"]} iconfont icon-write`} />

              <span>Jun 03, 2025</span>
            </div>
          </div>

          <div className={styles["dustblog-cover"]}>
            <div className="loading-image-container">
              <div className={styles["image-container"]}>
                <img className="banner-image" src="https://picx.zhimg.com/80/v2-05e02375a07540d1950b249e00c67095_1440w.jpeg" />
              </div>
            </div>
          </div>

          <hr className={styles["hr"]} />

          <section className={`${styles["dustblog-body"]} markdown`} >
            <LMarkdown markdown={markdown} />
          </section>

        </div>

      </section>
    </div >
  );
}
