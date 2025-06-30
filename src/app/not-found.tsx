"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft <= 0) {
      window.location.href = '/';
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">404</h1>
      <h2 className="text-2xl font-medium text-gray-700 mb-6 text-center">页面找不到啦！</h2>

      <p className="text-gray-600 mb-8 text-center">
        抱歉，您要访问的页面不存在或已被移动。
        <br />
        {timeLeft > 0 ? (
          <span>将在 <span className="font-bold text-purple-600">{timeLeft}</span> 秒后自动返回首页</span>
        ) : (
          <span>正在返回首页...</span>
        )}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          <span className="iconfont icon-home"></span>
          <span>返回首页</span>
        </Link>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
        >
          <span className="iconfont icon-back"></span>
          <span>返回上一页</span>
        </button>
      </div>
    </div>
  );
}
