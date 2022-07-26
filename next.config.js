/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [
      /chunks\/images\/.*$/, // Don't precache files under .next/static/chunks/images this improves next-optimized-images behaviour
      /chunks\/pages\/api\/.*/, // Dont cache the API it needs fresh serverinfo
    ],
    exclude: [
      /\.map$/, // dont cache map files
      /^.*ts.*$/, // Dont let serviceworker touch the TS streams
      /-manifest.json$/, // exclude those pesky json files in _next root but still serve the ones we need from /_next/static
    ],
    skipWaiting: true, // installs new SW when available without a prompt, we only need to send a reload request to user.
    dynamicStartUrl: false, // recommend: set to false if your start url always returns same HTML document, then start url will be precached, this will help to speed up first load.
    reloadOnOnline: false, // Prevents reloads on offline/online switch
    sourcemap: false,
    register: true,
    dynamicStartUrlRedirect: true
  },
};

module.exports = withPWA(nextConfig);
