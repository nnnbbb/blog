'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { getMarkdownComponents } from '@/components/LMarkdown/LMarkdownComponents';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import LMarkdown from '../../components/LMarkdown';

const initialMarkdown = `# 欢迎使用 Markdown 编辑器

# 参考

[1] [目标检测中的mAP+PyTorch实现_付修磊的博客-CSDN博客_map pytorch](https://blog.csdn.net/qq_38669138/article/details/117968834)

[2] [Python pandas，DataFrame排序(sort_values)_houyanhua1的博客-CSDN博客_dataframe排序](https://blog.csdn.net/houyanhua1/article/details/87804111)

[3] [Pandas的DataFrame的访问操作总结（10）_†徐先森®的博客-CSDN博客](https://blog.csdn.net/qq_36622490/article/details/103085343)

<div align=center>
<img src="https://picx.zhimg.com/80/v2-f531027e277cb024701520feb9d4c5f6_1440w.jpeg" style="width: 40%;"/>
<p class="img-caption">所以点个赞再走吧 orz</p>
</div>

| 病人 | 我们的传感器数据（mmHg）| 商业传感器数据（mmHg）|
| ---- | ---- | ---- |
| 1 | 61 | 55 |
| 2 | 70 | 71 |
| 3 | 69 | 67 |
| 4 | 63 | 61 |
| 5 | 75 | 70 |
| 6 | 62 | 61 |
| 7 | 70 | 71 |
| 8 | 66 | 61 |
## 基本语法

### 标题
# 一级标题
## 二级标题
### 三级标题

### 强调
*斜体文本* 或 _斜体文本_
**粗体文本** 或 __粗体文本__
***粗斜体文本*** 或 ___粗斜体文本___

### 列表
无序列表：
- 项目1
- 项目2
  - 子项目2.1
  - 子项目2.2

有序列表：
1. 第一项
2. 第二项
3. 第三项

### 链接与图片
[链接文字](https://www.example.com)
![图片说明](https://picsum.photos/200/100)

### 代码
行内代码: \`const greeting = "Hello World";\`

代码块:
\`\`\`javascript
function sayHello() {
  console.log("Hello, world!");
}
sayHello();
\`\`\`

### 引用
> 这是一段引用文本。
> 多行引用。

### LaTeX公式
行内公式: $E=mc^2$

行间公式:
$$
\\frac{n!}{k!(n-k)!} = \\binom{n}{k}
$$

$$
\\begin{matrix}
1 & 2 & 3 \\\\
a & b & c \\\\
\\end{matrix}
$$

### 表格
| 表头1 | 表头2 |
| ----- | ----- |
| 单元格1 | 单元格2 |
| 单元格3 | 单元格4 |
`;

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <div className="p-4 bg-white/50 backdrop-blur-md shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Markdown 编辑器</h1>
      </div> */}

      <div className="flex justify-between w-full flex-grow">
        {/* 编辑器 */}
        <div className="w-1/2 border-r border-gray-300 p-4">
          <textarea
            className="w-full h-1/2 p-4 bg-white/40 backdrop-blur-sm
            text-[21px]
            rounded-lg shadow-inner border border-gray-200 focus:outline-none
            focus:ring-2 focus:ring-purple-500 font-mono resize-none"
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="在这里输入 Markdown 文本..."
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(128, 30, 255, 0.3) white',
            }}
          />
        </div>

        {/* 预览 */}
        <div className="w-1/2 p-6 overflow-auto" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(128, 30, 255, 0.3) white',
        }}>
          <div className="w-full">
            {markdown.trim() ? (
              <LMarkdown markdown={markdown} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <span className={`iconfont icon-empty`} style={{ fontSize: '200px', color: 'rgb(128, 30, 255)' }}></span>

                <div className="mt-4">
                  你貌似没有写什么
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
