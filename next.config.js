const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === "development",
		runtimeCaching
	},
	i18n: {
		locales: ["en", "ar"],
		defaultLocale: "en"
	},
	reactStrictMode: true
});
