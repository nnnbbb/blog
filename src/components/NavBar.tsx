"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

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

// 导航项组件，支持下拉菜单
interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick: (title: string) => void;
}

function NavItem({ item, isActive, onClick }: NavItemProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const handleMouseEnter = () => {
    if (item.dropdown) {
      setShowDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    if (item.dropdown) {
      setShowDropdown(false);
    }
  };

  return (
    <div
      className={`navigation-item navigation-item-container ${isActive ? 'focus' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        onClick={() => {
          onClick(item.title);
          router.push(item.href);
        }}
      >
        <div className="navigation-content-item-container">

          <div className="navigaition-item-icon">
            <span className={`iconfont ${item.icon}`}></span>
          </div>
          <span className="font-medium" style={{ fontSize: '1.0rem' }}>{item.title}</span>
          {item.dropdown && (
            <span className="iconfont icon-down"></span>
          )}
        </div>
      </div>

      {/* 下拉菜单 */}
      {item.dropdown && (
        <div style={{ display: showDropdown ? 'block' : 'none' }}>
          <div>
            <div className="navigation-item-arrow"></div>
            <div className="navigation-arrow-mask"></div>
          </div>
          <div className="absolute top-full left-0 mt-1 w-40 bg-white/80 backdrop-blur-md rounded-md py-1 " style={{
            zIndex: 12,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            marginTop: '6px',
          }}>
            {item.dropdown.map((dropItem: DropdownItem) => (
              <Link
                key={dropItem.title}
                href={dropItem.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              >
                {dropItem.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NavBar() {
  const [activeItem, setActiveItem] = useState('首页');
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
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
    const controlNavbar = () => {
      // 如果组件还没有挂载或者window不存在，则直接返回
      if (typeof window === 'undefined') {
        return;
      }

      // 当前滚动位置
      const currentScrollY = window.scrollY;

      // 向下滚动且滚动超过20px时，隐藏导航栏
      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setVisible(false);
      }
      // 向上滚动时，显示导航栏
      else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }

      // 更新最后的滚动位置
      setLastScrollY(currentScrollY);
    };

    // 添加滚动事件监听器
    window.addEventListener('scroll', controlNavbar);

    // 组件卸载时，移除事件监听器
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div>
      <div
        className={`navigation-bar-container transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="navigation-bar-body">
          <div className="left">
            {/* Logo区域 */}
            <div className="website-icon">
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
                  className="navigation-item-container items-center px-3 py-2 text-gray-700 hover:text-purple-600"
                >
                  <div className="navigation-content-item-container">

                    <span className="iconfont icon-write !text-[1.2rem]"></span>
                    <span className="navigation-item-text">写点什么</span>
                  </div>
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
