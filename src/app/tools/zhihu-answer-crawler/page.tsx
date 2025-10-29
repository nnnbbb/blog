"use client"
import { useState } from "react"
import { Http } from "@/utils/http"
import { toast } from "@/components/Toast"
import { BlogItem } from "@/types/blog-item.interface"
import { useRouter } from "next/navigation";

export default function ZhihuAnswerCrawler() {
  const router = useRouter()
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string>("")

  const handleCrawl = async () => {
    if (!url.trim()) {
      toast("请输入知乎回答链接", 3000)
      return
    }

    setIsLoading(true)
    setResult("")

    try {
      const response = await Http.post<BlogItem>(
        "/thirdparty/crawl-zhihu-answer",
        { url: url.trim() }
      )

      if (response) {
        toast("爬取成功！", 3000)
        router.push(`/blog/article?seq=${response.id}`)
      } else {
        toast("爬取失败", 3000)
        setResult("爬取失败")
      }
    } catch (error) {
      console.error("爬取失败:", error)
      toast("爬取失败，请检查链接是否正确", 3000)
      setResult("爬取失败，请检查链接是否正确")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="zhihu-crawler-page" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div className="page-header" style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>
          知乎回答爬虫
        </h1>
        <p style={{ color: "#666", fontSize: "16px" }}>
          输入知乎回答链接，系统将自动爬取内容并转换为markdown格式保存到数据库中
        </p>
      </div>

      <div className="crawler-form" style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="zhihu-url"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              fontSize: "16px"
            }}
          >
            知乎回答链接
          </label>
          <input
            id="zhihu-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="请输入知乎回答链接，例如：https://www.zhihu.com/question/xxx/answer/xxx"
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#007bff"
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ddd"
            }}
          />
        </div>
        <div style={{ textAlign: "right" }}>

          <button
            onClick={handleCrawl}
            disabled={isLoading}
            style={{
              cursor: isLoading ? "not-allowed" : "pointer",
            }}

            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.classList.add("bg-purple-600", "text-white")
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.classList.remove("bg-purple-600", "text-white")
              }
            }}
          >
            {isLoading ? "爬取中..." : "开始爬取"}
          </button>
        </div>
      </div>

      {result && (
        <div className="result-section">
          <h3 style={{ fontSize: "12px", fontWeight: "500", marginBottom: "10px" }}>
            爬取结果
          </h3>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #e9ecef",
              borderRadius: "8px",
              fontSize: "14px",
              lineHeight: "1.5",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {result}
          </div>
        </div>
      )}

      <div className="usage-tips" style={{ marginTop: "30px", padding: "16px", backgroundColor: "#f0f8ff", borderRadius: "8px" }}>
        <h4 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "10px", color: "#0066cc" }}>
          使用说明
        </h4>
        <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px", color: "#666" }}>
          <li>请确保输入的链接是有效的知乎回答链接</li>
          <li>链接格式应为：https://www.zhihu.com/question/xxx/answer/xxx</li>
          <li>爬取过程可能需要几秒钟时间，请耐心等待</li>
          <li>爬取的内容将自动转换为markdown格式并保存到数据库</li>
        </ul>
      </div>
    </div>
  )
}
