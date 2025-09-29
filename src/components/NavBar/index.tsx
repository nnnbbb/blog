"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { NavItem } from './nav-item';
import { AnimatePresence, motion } from 'framer-motion';
import SearchBox from './SearchBox';
import "./styles.css"
import MobileNavBar from './Mobile';
import { navItems } from './nav-item.interface';
import UserInfo from '../UserCenter/UserInfo';
import Longin from '../UserCenter/Login';
import { useMounted } from '@/hooks/useMounted';

// 定义类型
interface DropdownItem {
  title: string;
  href: string;
}
interface NavItemType {
  title: string;
  href: string;
  icon: string;
  dropdown?: DropdownItem[];
}

export default function NavBar() {
  const [activeItem, setActiveItem] = useState('首页');
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const mounted = useMounted();

  const [isLogin, setIsLogin] = useState(() => {
    if (typeof window !== "undefined") {
      return Boolean(localStorage.getItem("token"));
    }
  });
  const [loginShow, setLoginShow] = useState(false);
  const [userInfoShow, setUserInfoShow] = useState(false);

  const [open, setOpen] = useState(false);

  // 根据路径设置激活项
  useEffect(() => {
    // 找到匹配当前路径的导航项
    const matchedItem = navItems.find(item => {
      // 精确匹配 /
      if (pathname === '/' && item.href === '/') {
        return true;
      }
      // 其他路径前缀匹配
      if (pathname.startsWith(item.href) && pathname !== '/' && item.href !== '/') {
        return true;
      }
      return false;
    });

    if (matchedItem) {
      setActiveItem(matchedItem.title);
    }
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [loginShow, userInfoShow]);

  return (
    <div>
      <div
        className={`navigation-bar-container transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="navigation-bar-body">
          <div className="large-nav left">
            {/* Logo区域 */}
            <div className="website-icon" onClick={() => router.push("/")}>
              <img src="/favicon.png" alt="" className="w-[45px] h-[45px]" />
              <span>神机阁</span>
            </div>

            {/* 导航菜单区域 */}
            <div className="flatten-container no-selection">
              {navItems.map((item) => (
                <NavItem
                  key={item.title}
                  item={item}
                  isActive={activeItem === item.title}
                  onClick={setActiveItem}
                />
              ))}
            </div>
          </div>
          <div className="large-nav right">
            {/* 右侧功能区 */}
            {/* 搜索框 */}
            <SearchBox />

            {/* 右侧按钮组 */}

            {/* 写点什么按钮 */}
            <div>
              <div
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className="navigation-item-container items-center"
              >
                <div className="navigation-content-item-container">

                  <span className="iconfont icon-write !text-[1.2rem]"></span>
                  <span className="navigation-item-text">写点什么</span>
                </div>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ originY: 0 }} // 以顶部为展开基准
                    >
                      <div
                        className="navigation-item-tooltip "
                        style={{ width: "130px", transform: "translate(-50px, 10px)" }}
                      >
                        <div className="write-icon-container p-2">
                          <div
                            className="page-item"
                            onClick={() => router.push("/markdown")}
                          >
                            <div className="iconfont icon-edit-blog">&ensp;写博客</div>
                            <span></span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="navigation-item-arrow"></div>
                        <div className="navigation-arrow-mask"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

            {/* 评论按钮 */}
            <div>
              <div
                className="navigation-item-container items-center"
              >
                <div className="navigation-content-item-container">
                  <span className="iconfont icon-comment !text-[1.2rem]"></span>
                  <span className="navigation-item-text">评论</span>
                </div>
              </div>
            </div>
            {/* 登录 */}
            <div onClick={() => {
              isLogin ? setUserInfoShow(true) : setLoginShow(true)
            }}>
              <div
                className="login-wrapper">
                <div>
                  <div className="login-placeholder">
                    <div className="portrait-text">
                      {mounted ? (isLogin ? 'x' : '未登录') : null}
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <Longin show={loginShow} setShow={setLoginShow} />
            <UserInfo show={userInfoShow} setShow={setUserInfoShow} />
          </div>

          <MobileNavBar />
        </div>

      </div>
    </div>
  );
}
