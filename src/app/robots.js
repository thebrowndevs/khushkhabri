// app/robots.js

export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/api"],
        },
        sitemap: "https://khushkhabri.in/sitemap.xml",
    };
}
