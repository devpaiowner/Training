/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
    debug: process.env.NODE_ENV === "development",
    i18n: {
        defaultLocale: "en",
//         the default languages are English and Swahili.
        locales: ["en", "sw"],
    },

    localePath: typeof window === "undefined" ? require("path").resolve("./public/locales") : "/locales",

    reloadOnPrerender: process.env.NODE_ENV === "development",
    ignoreRoutes: ["/_next/", "/static/", "/images", "/public/", "/api/"],
};
