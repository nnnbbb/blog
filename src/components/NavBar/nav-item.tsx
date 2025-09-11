import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// 定义类型
interface DropdownItem {
  title: string;
  href: string;
}
// 导航项组件，支持下拉菜单
interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick: (title: string) => void;
}
interface NavItemType {
  title: string;
  href: string;
  icon: string;
  dropdown?: DropdownItem[];
}

export function NavItem({ item, isActive, onClick }: NavItemProps) {
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
