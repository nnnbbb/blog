"use client";

import React from "react";
import styles from "./pagination.module.css";
import clsx from "clsx";

interface PaginationProps {
  total: number; // 数据总数
  page: number; // 当前页码
  pageSize: number; // 每页数量
  onChange: (page: number) => void; // 页码切换回调
}

export default function Pagination({
  total,
  page,
  pageSize,
  onChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages: (number | string)[] = [];
    const siblingCount = 2; // 当前页前后显示的数量
    const showTotal = 5 + siblingCount * 2; // 1, ..., n

    if (totalPages <= showTotal) {
      // 页数较少时直接显示全部
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 总是显示第一页
      pages.push(1);

      let left = Math.max(page - siblingCount, 2);
      let right = Math.min(page + siblingCount, totalPages - 1);

      if (left > 2) {
        pages.push("...");
      }

      for (let i = left; i <= right; i++) {
        pages.push(i);
      }

      if (right < totalPages - 1) {
        pages.push("...");
      }

      // 总是显示最后一页
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="text-center">
      <div>
        <ul className="pagination">
          {/* Prev 按钮 */}
          <li>
            <span
              className={clsx(
                "button",
                styles.pageButton,
                page === 1 ? "disabled" : ""
              )}
              onClick={() => page > 1 && onChange(page - 1)}
            >
              Prev
            </span>
          </li>

          {/* 页码按钮 */}
          {pages.map((p, idx) => (
            <li key={idx}>
              {p === "..." ? (
                <a className={clsx(styles.pageNumber, "page")}>...</a>
              ) : (
                <a
                  className={clsx(
                    styles.pageNumber,
                    "page",
                    page === p ? styles["current-page-active"] : ""
                  )}
                  onClick={() => onChange(p as number)}
                >
                  {p}
                </a>
              )}
            </li>
          ))}

          {/* Next 按钮 */}
          <li>
            <span
              className={clsx(
                "button",
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
