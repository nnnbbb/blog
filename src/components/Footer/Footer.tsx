import React from 'react';
import Link from 'next/link';
import './styles.css'
import { footerConfig } from '../../config/footer';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

// 带下划线的链接组件
const FooterLink = ({ href, children }: FooterLinkProps) => (
  <Link
    href={href}
    className="group inline-flex items-center text-gray-600 hover:text-gray-800"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="relative pb-1">
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></span>
    </div>
  </Link>
);

const Footer = () => {
  return (
    <div style={{ marginTop: '50px', padding: '30px', backgroundColor: 'var(--footer-background)' }}>
      <div className="copyright-container mx-auto justify-evenly flex md:flex-row" >
        {/* 左侧个人信息 */}
        <div className="ref-link flex flex-col font-bold">
          <h2 className="font-medium text-gray-800">{footerConfig.title}</h2>
          <span className="text-gray-600 ">Email: {footerConfig.email}</span>
          <span className="text-gray-600 ">{footerConfig.copyright}</span>
          <span>
            <Link
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500  hover:text-purple-700"
            >
              {footerConfig.icp.text}
            </Link>
          </span>
        </div>

        {/* 中间作品集 */}
        <div className="ref-link flex flex-col">
          <h2 className="font-medium text-gray-800 text-[2rem]">作品集</h2>
          <span className="flex items-center">
            <FooterLink href="#">
              <i className={`iconfont footer-icon icon-link mr-2`}></i>
              Digital IDE
            </FooterLink>
          </span>
          <span className="flex items-center">
            <FooterLink href="#">
              <i className={`iconfont footer-icon icon-link mr-2`}></i>
              OpenMCP
            </FooterLink>
          </span>
          <span className="flex items-center">
            <FooterLink href="#">
              <i className={`iconfont footer-icon icon-link mr-2`}></i>
              Seed3D
            </FooterLink>
          </span>
          <span className="flex items-center">
            <FooterLink href="#">
              <i className={`iconfont footer-icon icon-link mr-2`}></i>
              Live2dRender
            </FooterLink>
          </span>

        </div>

        {/* 右侧相关链接 */}
        <div className="ref-link flex flex-col text-xl">
          <h2 className="font-medium text-gray-800">相关链接</h2>

          <span className="flex items-center">
            <FooterLink href="https://www.zhihu.com/">
              <i className={`iconfont footer-icon icon-zhihu-circle-fill mr-2`}></i>
              知乎@锦恢
            </FooterLink>
          </span>
          <span className="flex items-center">
            <FooterLink href="https://www.bilibili.com/">
              <i className={`iconfont footer-icon icon-bilibili mr-2`}></i>
              Bilibili@锦恢
            </FooterLink>
          </span>
          <span className="flex items-center">
            <FooterLink href="https://github.com/">
              <i className={`iconfont footer-icon icon-github mr-2`}></i>
              Github@LSTM-Kirigaya
            </FooterLink>
          </span>
          <span className="flex items-center">
            <FooterLink href="/friends">
              <i className={`iconfont footer-icon icon-link mr-2`}></i>
              友情链接
            </FooterLink>
          </span>
          <span className="flex items-center">
            <FooterLink href="https://store.steampowered.com/">
              <i className={`iconfont footer-icon icon-steam mr-2`}></i>
              Steam@锦恢
            </FooterLink>
          </span>

        </div>
      </div>
    </div>
  );
};

export default Footer;
