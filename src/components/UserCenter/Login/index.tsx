"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../style.css"
import { createPortal } from "react-dom";
import { Http } from "../../../utils/http";
import { useMounted } from "@/hooks/useMounted";

interface LonginProps {
  show?: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

export default function Longin({ show, setShow }: LonginProps) {
  const mounted = useMounted();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    let res = await Http.post("/user/login", { username, password })
    localStorage.setItem("token", res)
    setShow(false)
  }

  const inputBox = (<>
    <div className="input-box-wrapper" style={{ display: show ? "" : "none" }}>
      <div className="sign-wrapper" style={{}}>
        <div className="login-container sign-up-box is-txl is-hidden" id="sign-up-box">
          <div className="form">
            <div className="create-account-title">
              <div className="portrait-html">
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
                    // backgroundColor: "#c0bee7",
                    width: 60,
                    height: 60
                  }}
                >
                  X
                </div>
              </div>
              <h2 className="title">创建账号</h2>
            </div>
            <form>
              <input
                type="text"
                className="my-input sign-input"
                placeholder="名字"
              />
              <input
                type="password"
                className="my-input sign-input"
                placeholder="密码"
                autoComplete="false"
              />
              <input
                type="password"
                className="my-input sign-input"
                placeholder="重复密码"
                autoComplete="false"
              />
              <input
                type="text"
                className="my-input sign-input"
                placeholder="头像链接（可选）"
              />
            </form>
            <br />
            <button className="primary submit">
              <span className="iconfont icon-register" /> 注册
            </button>
          </div>
        </div>
        <div className="login-container sign-in-box is-txl is-z" id="sign-in-box">
          <div className="form">
            <h2 className="title">
              <span className="iconfont icon-hack" /> 登入账号{" "}
            </h2>
            <form>
              <input
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                type="text"
                className="my-input sign-input"
                placeholder="名字"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                type="password"
                className="my-input sign-input"
                placeholder="密码"
                autoComplete="false"
              />
            </form>
            <br />
            <button className="primary submit" onClick={loginHandler}>
              <span className="iconfont icon-login" /> 登录{" "}
            </button>
          </div>
        </div>
        <div className="switch is-txr" id="switch-sidebar">
          <div className="switch_circle is-txr" />
          <div className="switch_circle switch_circle-t is-txr" />
          <div className="switch_container is-hidden" id="switch-c1">
            <h2 className="switch_title title" style={{ letterSpacing: 0 }}>
              Stay Hungry  Stay Foolish
            </h2>
            <p className="switch_description description">
              已经有账号的话，直接登录吧！当然，如果你是想要欣赏过渡动画，我会更高兴
            </p>
            <div className="dialog-btn-wrapper" style={{ width: "100%" }}>
              <button className="primary small-btn">
                <span className="iconfont icon-login" /> 登录{" "}
              </button>
              <button className="small-btn">
                <span className="iconfont icon-back" /> 返回{" "}
              </button>
            </div>
          </div>
          <div className="switch_container" id="switch-c2">
            <h2 className="switch_title title" style={{ letterSpacing: 0 }}>
              欢迎来到神机阁
            </h2>
            <p className="switch_description description">
              如果需要注册新的账号，请点击“注册”；否则点击“返回”返回主界面
            </p>
            <div className="dialog-btn-wrapper" style={{ width: "100%" }}>
              <button className="primary small-btn">
                <span className="iconfont icon-register" /> 注册{" "}
              </button>
              <button className="small-btn" onClick={() => setShow?.(false)}>
                <span className="iconfont icon-back" /> 返回{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
  if (mounted) {
    return createPortal(inputBox, document.body);
  }
  return null;
}
