import type { NextConfig } from 'next';

import './src/lib/env/client';
import './src/lib/env/server';

import { redirects } from './redirects';

/**
 * CSPs that we're not adding (as it can change from project to project):
 * frame-src, connect-src, script-src, child-src, style-src, worker-src, font-src, media-src, and img-src
 */
const ContentSecurityPolicy = `
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'self';
  manifest-src 'self';
  report-to default;
`;

// For more information, check https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer-when-downgrade',
  },
  {
    key: 'Permissions-Policy',
    value: `accelerometer=(), camera=(), gyroscope=(), microphone=(), usb=()`,
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
];

const withPWA = require('next-pwa')({
  dest: 'public', // 生成的 service worker 文件存放在 public 目录
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = withPWA({
  poweredByHeader: false,
  experimental: {
    webpackMemoryOptimizations: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return redirects;
  },
  reactStrictMode: true,
  eslint: {
    // 在构建时忽略所有 ESLint 错误
    ignoreDuringBuilds: true,
  },
  // output: 'export', // 导出静态文件
});



export default nextConfig;
