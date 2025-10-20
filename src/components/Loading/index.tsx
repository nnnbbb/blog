"use client";

import React, { useEffect, useState } from "react";

export default function Loading() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {

    // 页面完全加载后隐藏
    const handleLoad = () => {
      setHidden(true);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);


  return (
    <div
      id="loading-layer"
      className={`loading-layer ${hidden ? "is-hidden" : ""}`}
    >
      <div className="arc" />
      <h1 className="loading-text">
        <span>LOADING</span>
      </h1>
    </div>
  );
}
