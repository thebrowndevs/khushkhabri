// lib/permissions.js

// Define resources
export const Resources = {
  DASHBOARD: "dashboard",
  ENQUIRIES: "enquiries",
  SERVICE_ORDERS: "serviceOrders",
  CALL_ORDERS: "callOrders",
  SERVICES: "services",
  COLLECTIONS: "collections",
  SUB_SERVICES: "subServices",
  CALL_PLANS: "callPlans",
  BLOGS: "blogs",
  CATEGORIES: "categories",
  TAGS: "tags",
  MEDIA: "media",
  BANNERS: "banners",
  USERS: "users",
  // SETTINGS: 'settings',
  TESTIMONIALS: "testimonials",
  PRIVACY_POLICY: "privacy-policy",
  REFUND_POLICY: "refund-policy",
  TERMS_AND_CONDITIONS: "terms-and-conditions",
};

// ABOUT_US: 'about-us',
// CONTACT_US: 'contact-us',
// Define possible actions
export const Actions = {
  VIEW: "view",
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
};

// Frontend helper to check permissions against session.user
export function checkPermission(user, resource, action) {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.role === "sub-admin") {
    const perms = user.permissions?.[resource];
    return !!perms?.[action];
  }
  return false;
}

export function onlyAdminPermission(user) {
  if (user?.role === "admin") return true;
  return false;
}
