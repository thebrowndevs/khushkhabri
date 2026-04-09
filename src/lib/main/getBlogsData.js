// lib/getBlogsData.js
import Blog from "@/models/blogModel";

import { connectDB } from "../mongodb";
import Tag from "@/models/tagModel";

export async function getAllBlogsSlugs() {
  try {
    await connectDB();

    const blogs = await Blog.find({ status: true }).select("slug updatedAt"); // only fetch `slug` field
    return blogs.map((b) => ({
      slug: b.slug,
    }));
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
}

// blogs page
export async function getBlogsData() {
  try {
    await connectDB();
    const blogs = await Blog.find({ status: true });
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}
// to get single blog
export async function getBlogBySlug(slug) {
  try {
    await connectDB();
    const res = await Blog.findOne({ slug }).populate("tags");

    const blog = JSON.parse(JSON.stringify(res));
    return blog;
  } catch (error) {
    console.error(`Error fetching blog ${slug}:`, error);
    return null;
  }
}

export async function getLatestBlogs(limit = 3) {
  try {
    await connectDB();
    const latest = await Blog.find({ status: true })
      .sort({ createdAt: -1 })
      .limit(limit);
    return JSON.parse(JSON.stringify(latest));
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
    return [];
  }
}
