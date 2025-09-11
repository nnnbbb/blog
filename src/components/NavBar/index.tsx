"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { NavItem } from './nav-item';
import { AnimatePresence, motion } from 'framer-motion';
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

// 导航项数据
const navItems: NavItemType[] = [
  { title: '首页', href: '/', icon: 'icon-home' },
  {
    title: '博客',
    href: '/blog',
    icon: 'icon-blog',
    // dropdown: [
    //   { title: '技术博客', href: '/blog/tech' },
    //   { title: '生活随笔', href: '/blog/life' },
    //   { title: '思考感悟', href: '/blog/thoughts' },
    // ],
  },
  { title: '音乐', href: '/music', icon: 'icon-guitar' },
  { title: '工具箱', href: '/tools', icon: 'icon-toolbox' },
  {
    title: '其他',
    href: '/others',
    icon: 'icon-glass-cheers',
    dropdown: [
      { title: '收藏', href: '/others/favorites' },
      { title: '友链', href: '/others/friends' },
    ],
  },
  { title: '联系', href: '/contact', icon: 'icon-contact' },
];

export default function NavBar() {
  const [activeItem, setActiveItem] = useState('首页');
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

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


  return (
    <div>
      <div
        className={`navigation-bar-container transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="navigation-bar-body">
          <div className="left">
            {/* Logo区域 */}
            <div className="website-icon" onClick={() => router.push("/")}>
              <img src="https://kirigaya.cn/favicon.png" alt="" className="w-[45px] h-[45px]" />
              <span>养心阁</span>
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
          <div className="right">
            {/* 右侧功能区 */}
            <div className="search-box">
              {/* 搜索框 */}
              <div className="search-box-container">

                <div className='search-type-container'>

                  <div className='current-search-type'>
                    <span className="iconfont icon-blog !text-[1.2rem]"></span>
                  </div>

                  <div className='current-search-type-arrow'>
                    <span className="iconfont icon-arrow-down"></span>
                  </div>
                </div>
                <span className="search-spliter"></span>
                <div className='search-input-container'>
                  <input type="text" className="search-box" />
                  <div className='search-box-icon'>
                    <span className="iconfont icon-search !text-[1.2rem]"></span>
                  </div>
                </div>
              </div>

            </div>

            {/* 右侧按钮组 */}

            <div className="flex " >
              {/* 写点什么按钮 */}
              <div>
                <div
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                  className="navigation-item-container items-center px-3 py-2 text-gray-700 "
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
                  className="navigation-item-container items-center px-3 py-2 text-gray-700 hover:text-purple-600"
                >
                  <div className="navigation-content-item-container">
                    <span className="iconfont icon-comment !text-[1.2rem]"></span>
                    <span className="navigation-item-text">评论</span>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
