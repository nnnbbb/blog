"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../style.css"
import { useMounted } from "@/hooks/useMounted";

interface UserInfoProps {
  show?: boolean
  setShow?: Dispatch<SetStateAction<boolean>>
}

export default function UserInfo({ show, setShow }: UserInfoProps) {
  const mounted = useMounted();

  const inputBox = (<div className="input-box-wrapper" style={{ display: show ? '' : 'none' }}>
    <div className="dialog-box user-info-box" style={{}}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="user-info-title">
          <span className="iconfont icon-hack" /> 用户信息{" "}
        </h2>
        <div>
          <div onClick={() => setShow?.(false)} className="little-close"> × </div>
        </div>
      </div>
      <div className="user-info-main">
        <div className="protrait-wrapper">
          <div className="protrait">
            <div>
              <div
                style={{
                  transition: "1.5s",
                  fontFamily: "var(--base-font)",
                  fontSize: 18,
                  fontWeight: 1000,
                  borderRadius: "0.2em",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  color: "white",
                  display: "flex",
                  backgroundColor: "#c0bee7",
                  width: 200,
                  height: 200
                }}
              >
                X
              </div>
            </div>
          </div>
        </div>
        <div className="user-text-info-wrapper">
          <form className="user-info-input-box">
            <input
              className="user-info-input my-input"
              type="text"
              placeholder="名字"
            />
            <input
              className="user-info-input my-input"
              type="password"
              placeholder="密码"
              autoComplete="false"
            />
            <input
              className="user-info-input my-input"
              type="password"
              placeholder="重复密码"
              autoComplete="false"
            />
            <input
              className="user-info-input my-input"
              type="text"
              placeholder="头像链接（可选）"
            />
          </form>
          <div className="user-info-btn-box">
            {/**/}
            <button className="user-info-button primary">
              <span className="iconfont icon-edit-circle" /> 修改{" "}
            </button>
            <button className="user-info-button">
              <span className="iconfont icon-exit" /> 登出{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>)
  if (mounted) {
    return createPortal(inputBox, document.body);
  }
  return null;

}
