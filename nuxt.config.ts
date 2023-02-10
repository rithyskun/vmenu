// https://nuxt.com/docs/api/configuration/nuxt-config
import en from "./locale/en.json";
import km from "./locale/km.json";

export default defineNuxtConfig({
    modules: [
        "@pinia/nuxt",

        ["@nuxtjs/tailwindcss", {
            cssPath: "~/assets/css/tailwind.css",
            configPath: "tailwind.config",
            exposeConfig: true,
        }],

        "@vueuse/nuxt",
        [
            "@nuxtjs/i18n",
            {
                vueI18n: {
                    legacy: false,
                    locale: "en",
                    messages: {
                        en,
                        km,
                    },
                },
            },
        ],
        "nuxt-icon",
        [
            "@nuxtjs/color-mode",
            {
                classSuffix: "",
            },
        ],
        "@nuxtjs/color-mode"
    ],
    runtimeConfig: {
        database: process.env.DATABASE_URL,
        jwtAccessToken: process.env.JWT_ACCESS_TOKEN,
        jwtRefreshToken: process.env.JWT_REFRESH_TOKEN
    },
    ssr: true
});
