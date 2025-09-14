"use client";

import React from "react";
import styles from "./article.module.css";
import clsx from "clsx";

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className={clsx(styles["icon-container"], styles["dustblog-body"])}>
      <div className={styles["k-tag-container"]}>
        {tags.map((tag, index) => (
          <div key={index} style={{ margin: "5px", cursor: "pointer" }}>
            <div
              className={styles["k-tag"]}
              style={{
                fontSize: "20px",
                backgroundColor: "rgba(198, 192, 216, 0.7)",
              }}
            >
              {tag}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagList;
