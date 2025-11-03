'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './markdown.module.css';
import { Http } from '../../utils/http';
import { toast } from '@/components/Toast';
import { useRouter } from 'next/navigation';

interface PublishFormProps {
  markdown: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
  isPrivate: boolean;
  setIsPrivate: (value: boolean) => void;
  isPinned: boolean;
  setIsPinned: (value: boolean) => void;
  publishArticle: () => Promise<void>
}

const SelectedItem: React.FC<{
  text: string;
  onRemove: (text: string) => void
}> = ({ text, onRemove }) => (
  <div className={styles["selected-item"]}>
    <span>{text}</span>
    <span className={styles["selected-close"]} onClick={() => onRemove(text)}>×</span>
  </div>
);
interface CoverImgProps {
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>
}

function CoverImg({ imgUrl, setImgUrl }: CoverImgProps) {
  const getRandomImage = () => {
    Http.get("/thirdparty/random-image-url").then(r => setImgUrl(r))
  }
  return (<div>
    <div style={{ display: 'flex' }}>
      <div>
        <div className={styles["align-container"]}>
          <div className={styles["subTitle"]}>
            <span className="iconfont icon-link"></span>
            &ensp;封面链接
          </div>
          <input
            style={{ height: '2.4em' }}
            type="text"
            className="my-input imgUrlInput"
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
          />
        </div>
        <blockquote className="kquote">随机图片调用了www.dmoe.cc的接口，不代表我的个人审美</blockquote>
        <button
          className={styles['publishBtn']}
          onClick={getRandomImage}
        >
          <span className="iconfont icon-random"></span>
          &ensp;随机图片
        </button>
      </div>

      <div className="flex justify-center items-center" style={{
        height: '200px',
        width: '50%',
        overflow: 'hidden',
      }}>
        {
          imgUrl === "" ?
            (
              <div className="random-image-empty">

                <span className="iconfont icon-image"></span>
              </div>
            ) :
            (
              <div className={styles["loading-image-container"]}>
                <div className="image-container">
                  <img src={imgUrl} className={styles["preview-image"]} />
                </div>
              </div>
            )
        }
      </div>

    </div>
    <hr />
  </div>
  )
}

export default function PublishForm({
  markdown,
  title,
  setTitle,
  imgUrl,
  setImgUrl,
  selectedTags,
  setSelectedTags,
  isPrivate,
  setIsPrivate,
  isPinned,
  setIsPinned,
  publishArticle,
}: PublishFormProps) {
  const [recommendTags, setRecommendTags] = useState<string[]>([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    Http.get<string[]>("/blog/get-tags")
      .then(res => setTags(res))
  }, [])

  const toggleOptions = () => setOptionsVisible(prev => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTagInput(value);
    if (!value) {
      setRecommendTags([]);
      return;
    }
    const matched = tags.filter(tag => tag.toLowerCase().includes(value.toLowerCase()) && !selectedTags.includes(tag));
    setRecommendTags(matched);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = tagInput.trim();
      if (value !== "" && !selectedTags.includes(value)) {
        // 添加到 selectedTags
        setSelectedTags(prev => [...prev, value]);
      }
      // 清空输入框
      setTagInput("");
      // 清空推荐
      setRecommendTags([]);
    }
  };


  const handleSelectRecommend = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev: any) => [...prev, tag]);
    }
    setRecommendTags([]);
    setTagInput("");
  };
  const handleSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(item => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    setTagInput("");
  };
  const handleRemove = (tag: string) => setSelectedTags(selectedTags.filter(item => item !== tag));


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const container = document.querySelector(`.${styles["k-select-container"]}`);
      if (container && !container.contains(event.target as Node)) {
        setOptionsVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div>

      <CoverImg
        imgUrl={imgUrl}
        setImgUrl={setImgUrl}
      />
      <div>
        <div className={styles["align-container"]}>
          <div className={styles["subTitle"]}>
            <span className="iconfont icon-tag"></span> &ensp;文章标签
          </div>
          <div className={`${styles["k-select-container"]} my-input`} reserve-keyword="false">
            <div className={styles["k-select-box-container"]}>
              <input readOnly
                type="text"
                autoComplete="off"
                placeholder={selectedTags.length > 0 ? "" : "选择标签，或者创建标签"}
                onClick={toggleOptions}
              />
              <div className={styles["selected-item-container"]}>
                {selectedTags.map((tag) => (
                  <SelectedItem key={tag} text={tag} onRemove={handleRemove} />
                ))}
                <div className={styles["allow-create-edit"]}>
                  <input type="text"
                    value={tagInput}
                    // onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    onChange={handleInputChange}
                  />

                  <AnimatePresence>
                    {recommendTags.length > 0 && (
                      <motion.div
                        className={styles["input-recommend-container"]}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        style={{ transformOrigin: 'top' }}
                        transition={{ duration: 0.3 }}
                      >
                        {recommendTags.map(tag => (
                          <div
                            key={tag}
                            className={styles["input-recommend-container-item"]}
                            onClick={(e) => handleSelectRecommend(tag)}
                          >
                            {tag}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>


                </div>
              </div>
              <div className={styles["select-icon-container"]}>
                <span className="iconfont icon-arrow-down"
                  style={{
                    transform: optionsVisible ? 'rotate(0deg)' : 'rotate(180deg)',
                    transition: 'var(--animation-3s)',
                  }}>
                </span>
              </div>
            </div>
            {/* 下拉选项，初始隐藏 */}
            <AnimatePresence>
              {optionsVisible && (
                <motion.div
                  className={styles["k-select-options-container"]}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  style={{ transformOrigin: 'top' }}
                  transition={{ duration: 0.2 }}
                >
                  {tags.map((tag, idx) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <div
                        key={idx}
                        className={`${styles["k-option-container"]} ${isSelected ? styles["k-option-selected"] : ""}`}
                        onClick={() => handleSelect(tag)}
                      >
                        <span className={styles["k-option-text"]}>
                          {isSelected && <span className="iconfont icon-duigou"></span>}
                          <span>&ensp;{tag}</span>
                        </span>
                      </div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
        <div className={styles["align-container"]}>
          <div className={styles["subTitle"]}>
            <span className="iconfont icon-title"></span> &ensp;文章标题
          </div>
          <input
            type="text"
            className="my-input"
            style={{
              width: '100% !important',
              marginRight: '20px'
            }}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
      </div>


      <div className='flex justify-start'>
        <div className="k-switch-container m-6" >
          <input
            id="private-toggle"
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          <label htmlFor="private-toggle">
            <div className="switch-label">
              私密发布
            </div>
          </label>
          <input
            id="pinned-toggle"
            type="checkbox"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
          />
          <label htmlFor="pinned-toggle">
            <div className="switch-label">
              置顶
            </div>
          </label>
        </div>

        <div className={styles['publish-button']}>
          <button
            className={styles['publishBtn']}
            onClick={publishArticle}>
            <span className='iconfont icon-publish'> 发布到我的博客</span>
          </button>
        </div>
      </div>
    </div>
  );
}
