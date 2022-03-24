/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
// module.exports = nextConfig

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
	pwa: {
		dest: "public",
	register: true,
		skipWaiting: true,
		// disable: process.env.NODE_ENV === "development",
		// swSrc: "./services/service-worker.js",
		runtimeCaching
	}
});

// const withOffline = require("next-offline");

// module.exports = withOffline({
// 	workboxOpts: {
// 		swDest: process.env.NEXT_EXPORT
// 			? "service-worker.js"
// 			: "static/service-worker.js",
// 		runtimeCaching: [
// 			{
// 				urlPattern: /^https?.*/,
// 				handler: "NetworkFirst",
// 				options: {
// 					cacheName: "offlineCache",
// 					expiration: {
// 						maxEntries: 200
// 					}
// 				}
// 			}
// 		]
// 	},
// 	async rewrites() {
// 		return [
// 			{
// 				source: "/service-worker.js",
// 				destination: "/_next/static/service-worker.js"
// 			}
// 		];
// 	}
// });
