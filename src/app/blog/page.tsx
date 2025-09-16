"use client";

import { useEffect, useState } from 'react';
import BlogCard from './blog-card';
import styles from './blog.module.css';
import Pagination from '../../components/Pagination';
import { Http } from '@/utils/http';


interface BlogItem {
  id: number;
  title: string;
  imgUrl: string;
  tags: string[];
  adjustTime: string;
}


export default function Blog() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 9;
  useEffect(() => {
    // 默认滚动到 window 顶部
    const sc = document.scrollingElement || document.documentElement || document.body;
    sc.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);
  useEffect(() => {
    Http.get<{ list: BlogItem[], total: number }>(`/blog/query-blog?page=${page}&pageSize=${pageSize}`)
      .then((res) => {
        setBlogs(res.list);
        setTotal(res.total);
      })
      .catch((err) => console.error("请求失败:", err));
  }, [page]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <section style={{ maxWidth: '1050px' }}>
        <section className="banner-image-wrapper">
          <div className="loading-image-container">
            <div className="image-container">
              <img src="https://picx.zhimg.com/80/v2-9377476212f1c1e44ebe6c8071da8341_1440w.jpeg" className="cover-banner-image" />
            </div>
          </div>
        </section>

        <br />

        <div className={styles["k-tabs"]} id="pivot" style={{ height: '1515px' }}>
          <div className={styles["k-tabs-tags"]}>
            <div className={styles["k-tabs-tag-item"]} style={{ color: 'white' }}>
              <span className="iconfont icon-hack pane-icon"></span>
              <span>我的博客({total})</span>
            </div>

            {/* <div className="k-tabs-tag-item">
              <span className="iconfont icon-document pane-icon"></span>
              <span>知乎专栏(0)</span>
            </div>

            <div className="k-tabs-tag-item">
              <span className="iconfont icon-learning pane-icon"></span>
              <span>所思所想</span>
            </div> */}

            <div className={styles["hover-bar"]} style={{
              transform: 'translateX(0px)',
              height: '43.75px',
              width: '155px',
            }}>
            </div>
          </div>
          <div className={styles["k-tabs-content"]}>

            <div className="k-pane-content">
              <div style={{ minHeight: '800px' }}>
                <div style={{}}>
                  <section style={{ paddingTop: '10px' }}>
                    <div className="row">
                      {blogs.map((blog) => (
                        <BlogCard
                          key={blog.id}
                          id={blog.id}
                          title={blog.title}
                          image={blog.imgUrl}
                          tags={blog.tags}
                          modifiedAt={blog.adjustTime}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <Pagination
                total={total}
                page={page}
                pageSize={pageSize}
                onChange={(p) => setPage(p)}
              />
            </div>


          </div>
        </div>
      </section>
    </div>
  );
}

