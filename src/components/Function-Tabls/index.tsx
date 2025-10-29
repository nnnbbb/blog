"use client"
import type { ReactElement } from "react"
import "./style.css"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import type { TabChildType, TabType } from "./function-tabs.interface"

interface FunctionTabsProps {
  tabs: TabType[]
}

export const FunctionTabs = ({ tabs }: FunctionTabsProps): ReactElement => {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const tagRefs = useRef<Array<HTMLDivElement | null>>([])
  const [hoverBarStyle, setHoverBarStyle] = useState<{ width: number; left: number; height: number }>(
    { width: 0, left: 0, height: 44 }
  )

  useEffect(() => {
    const activeEl = tagRefs.current[activeIndex]
    if (activeEl) {
      setHoverBarStyle({
        width: activeEl.offsetWidth,
        left: activeEl.offsetLeft,
        height: activeEl.offsetHeight
      })
    }
  }, [activeIndex])

  const currentTab: TabType | undefined = tabs[activeIndex]
  const hasChildren = (currentTab?.tabChildren?.length ?? 0) > 0

  const handleToolClick = (child: TabChildType): void => {
    if (child.href) router.push(child.href)
  }

  return (
    <div className="k-tabs function-tabs" style={{ height: 200, minHeight: 1300 }}>
      <div className="k-tabs-tags">
        {tabs.map((tab, idx) => (
          <div
            key={tab.label}
            ref={(el) => {
              tagRefs.current[idx] = el
            }}
            className="k-tabs-tag-item"
            style={{ color: idx === activeIndex ? "white" : undefined }}
            onClick={() => setActiveIndex(idx)}
          >
            <span className="" />
            <span>{tab.label}</span>
          </div>
        ))}
        <div
          className="hover-bar"
          style={{
            transform: `translateX(${hoverBarStyle.left}px)`,
            height: `${hoverBarStyle.height}px`,
            width: hoverBarStyle.width
          }}
        />
      </div>

      <div className="k-tabs-content">
        <div className="k-pane-content">
          {hasChildren && (
            <div className="tools-list">
              {currentTab!.tabChildren.map((child) => (
                <div key={child.toolName} className="tool-item" onClick={() => handleToolClick(child)}>
                  <h3 className="tool-name">
                    <span className="iconfont icon-llm" /> {child.toolName}
                  </h3>
                  <p className="tool-desc">{child.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


