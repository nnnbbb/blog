"use client";

import React, { useState, useEffect } from "react";
import styles from "./under-line-comment.module.css";
import Drawer from "../Drawer";
import clsx from "clsx";

interface Comment {
  id: string;
  text: string;     // 选中的文本
  content: string;  // 评论内容
}

export default function UnderLineComment() {
  const [selectedText, setSelectedText] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [buttonPos, setButtonPos] = useState({ top: 0, left: 0 });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const selection = window.getSelection();
      const target = e.target as HTMLElement;

      if (target.closest(`.${styles["under-line-comment-item"]}`)) {
        // 点击浮动按钮时，不隐藏
        return;
      }

      if (selection && selection.toString().trim()) {
        const range = selection.getRangeAt(0).getBoundingClientRect();
        const text = selection.toString();
        const id = `sel-${Date.now()}-${Math.random()}`; // 生成唯一ID

        setSelectedText(text);
        setSelectedId(id);
        setButtonPos({
          top: range.top + window.scrollY - 50,
          left: range.left + window.scrollX,
        });
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleAddCommentClick = () => {
    setDrawerVisible(true);
    setShowButton(false);
  };

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: selectedId,
      text: selectedText,
      content: newComment,
    };

    // 模拟请求，可替换为 Http.post
    setComments(prev => [...prev, comment]);
    setNewComment("");
  };

  const getCommentsById = (id: string) =>
    comments.filter(c => c.id === id);

  return (
    <>
      {/* 浮动按钮 */}
      {showButton && (
        <div style={{
          position: "absolute", top: buttonPos.top,
          left: buttonPos.left,
          zIndex: 10000,
          padding: "4px 8px",
          background: "var(--shadow-color)",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}>
          {/* <span className="iconfont icon-comment"></span>
          <button
            style={{
            }}
            onClick={handleAddCommentClick}
          >
            添加评论
          </button> */}
          <div className={clsx(
            styles["under-line-comment-item"],
            styles["under-line-comment-container"],
          )}>
            <div>
              <div
                className={styles["under-line-comment-content-item-container"]}
                onClick={() => {
                  navigator.clipboard.writeText(selectedText);
                  setShowButton(false);
                }}
              >
                <div
                  style={{ color: "#FFF" }}
                  className={styles["under-line-comment-item-icon"]}>
                  <span className="iconfont icon-copy"></span>
                </div>
                <span className="font-medium" style={{ fontSize: '.9rem', color: "#FFF" }}>复制</span>
              </div>
            </div>


            <div>
              <div
                className={styles["under-line-comment-content-item-container"]}
                onClick={(e) => {
                  e.stopPropagation(); // 阻止冒泡
                  handleAddCommentClick();
                }}
                style={{ cursor: 'pointer' }}
              >
                <div
                  style={{ color: "#FFF" }}
                  className={styles["under-line-comment-item-icon"]}>
                  <span className="iconfont icon-comment"></span>
                </div>
                <div className="font-medium" style={{ fontSize: '.9rem', color: "#FFF" }}>评论</div>
              </div>
            </div>
          </div>


        </div>
      )}

      {/* Drawer */}
      <Drawer visible={drawerVisible} onClose={() => setDrawerVisible(false)}>
        <div>
          <h4>选中的文本：</h4>
          <p style={{ background: "#f5f5f5", padding: "8px" }}>{selectedText}</p>

          <h4>评论列表：</h4>
          {getCommentsById(selectedId).length === 0 ? (
            <p>暂无评论</p>
          ) : (
            getCommentsById(selectedId).map((c, idx) => (
              <div
                key={idx}
                style={{ padding: "4px 0", borderBottom: "1px solid #eee" }}
              >
                {c.content}
              </div>
            ))
          )}

          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="输入评论..."
            style={{ width: "100%", height: 80, marginTop: 8 }}
          />
          <button
            onClick={handleSubmit}
            style={{
              marginTop: 8,
              padding: "6px 12px",
              background: "#1890ff",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            提交
          </button>
        </div>
      </Drawer>
    </>
  );
}
