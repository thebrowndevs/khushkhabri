// app/robots.js

export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/api", "/user"],
            },
        ],
        sitemap: "https://khushkhabri.in/sitemap.xml",
    };
}


