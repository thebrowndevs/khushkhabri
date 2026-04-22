// app/sitemap.js

import { getAllBlogsSlugs } from "@/lib/main/getBlogsData";

export default async function sitemap() {

    const siteUrl = "https://www.khushkhabri.in";

    // Static Pages
    const staticRoutes = [
        "",
        "/about-us",
        "/templates",
        "/blogs",
        "/contact-us",
        "/video-invites",
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
    }));

    // Dynamic Blog Pages
    const blogs = await getAllBlogsSlugs();

    const blogRoutes = blogs.map((blog) => ({
        url: `${siteUrl}/blogs/${blog.slug}`,
        lastModified: blog.updatedAt || new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    }));


    return [
        ...staticRoutes,
        ...blogRoutes,
    ];
}