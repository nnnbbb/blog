export interface DropdownItem {
  title: string;
  href: string;
}
// 导航项组件，支持下拉菜单
export interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick: (title: string) => void;
}
export interface NavItemType {
  title: string;
  href: string;
  icon: string;
  dropdown?: DropdownItem[];
}
export const navItems: NavItemType[] = [
  { title: '首页', href: '/', icon: 'icon-home' },
  {
    title: '博客',
    href: '/blog',
    icon: 'icon-blog',
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
