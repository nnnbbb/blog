"use client";

import React from "react";
import styles from './pagination.module.css';
import clsx from "clsx";

interface PaginationProps {
  total: number;       // 数据总数
  page: number;        // 当前页码
  pageSize: number;    // 每页数量
  onChange: (page: number) => void; // 页码切换回调
}

export default function Pagination({ total, page, pageSize, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="text-center">
      <div>
        <ul className="pagination">
          {/* Prev 按钮 */}
          <li>
            <span
              className={clsx(
                'button',
                styles.pageButton,
                page === 1 ? "disabled" : "",
              )}
              onClick={() => page > 1 && onChange(page - 1)}
            >
              Prev
            </span>
          </li>

          {/* 页码按钮 */}
          {pages.map((p) => (
            <li key={p}>
              <a
                className={clsx(
                  styles.pageNumber,
                  'page',
                  page === p ? styles["current-page-active"] : ""
                )}
                onClick={() => onChange(p)}
              >
                {p}
              </a>
            </li>
          ))}

          {/* Next 按钮 */}
          <li>
            <span
              className={clsx(
                'button',
                styles.pageButton,
                page === totalPages ? "disabled" : "",
              )}
              onClick={() => page < totalPages && onChange(page + 1)}
            >
              Next
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
