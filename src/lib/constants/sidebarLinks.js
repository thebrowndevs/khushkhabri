import {
  FaHome,
  FaEnvelope,
  FaBriefcase,
  FaThLarge,
  FaFileAlt,
  FaTags,
  FaUsers,
  FaImages,
  FaCogs,
  FaUser,
  FaBlog,
  FaQuoteRight,
  FaPhoneAlt,
  FaCalendarCheck,
  FaClipboardList,
  FaShieldAlt,
  FaUndoAlt,
  FaFileContract,
  FaInfoCircle,
  FaAddressCard,
} from "react-icons/fa";
import { RiCollageLine } from "react-icons/ri";
import { SiAffinitydesigner } from "react-icons/si";

import { Resources } from "../permissions";

export const ADMIN_SIDEBAR_LINKS = [
  {
    key: Resources.DASHBOARD,
    label: "Dashboard",
    href: "/admin",
    icon: <FaHome />,
  },
  {
    key: Resources.SERVICE_ORDERS,
    label: "Orders",
    href: "/admin/orders",
    icon: <FaClipboardList />,
  },
  // {
  //   key: Resources.ENQUIRIES,
  //   label: "Enquiries",
  //   href: "/admin/enquiries",
  //   icon: <FaEnvelope />,
  // },
  // {
  //   key: Resources.SERVICES,
  //   label: "Services",
  //   href: "/admin/products",
  //   icon: <FaBriefcase />,
  // },
  {
    key: Resources.BLOGS,
    label: "Blogs",
    href: "/admin/blogs",
    icon: <FaBlog />,
  },
  {
    key: Resources.CATEGORIES,
    label: "Categories",
    href: "/admin/categories",
    icon: <FaThLarge />,
  },
  {
    key: Resources.TAGS,
    label: "Tags",
    href: "/admin/tags",
    icon: <FaTags />,
  },
  {
    key: Resources.MEDIA,
    label: "Media",
    href: "/admin/media",
    icon: <FaImages />,
  },
  // {
  //   key: Resources.BANNERS,
  //   label: "Banners",
  //   href: "/admin/banners",
  //   icon: <SiAffinitydesigner />,
  // },
  {
    key: Resources.USERS,
    label: "Users",
    href: "/admin/users",
    icon: <FaUser />,
  },
  // {
  //     key: Resources.SETTINGS,
  //     label: 'Settings',
  //     href: '/admin/settings',
  //     icon: <FaCogs />,
  // },
  {
    key: Resources.TESTIMONIALS,
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: <FaQuoteRight />,
  },
  // new policy & info pages
  {
    key: Resources.PRIVACY_POLICY,
    label: "Privacy Policy",
    href: "/admin/privacy-policy",
    icon: <FaShieldAlt />,
  },
  {
    key: Resources.REFUND_POLICY,
    label: "Refund Policy",
    href: "/admin/refund-policy",
    icon: <FaUndoAlt />,
  },
  {
    key: Resources.TERMS_AND_CONDITIONS,
    label: "Terms & Conditions",
    href: "/admin/terms-and-conditions",
    icon: <FaFileContract />,
  },
];

export const USER_SIDEBAR_LINKS = [
  {
    key: "my-templates",
    label: "My Templates",
    href: "/user/templates",
    icon: <FaThLarge />,
  },
  {
    key: "orders-history",
    label: "Orders History",
    href: "/user/orders",
    icon: <FaClipboardList />,
  },
  {
    key: "my-profile",
    label: "My Profile",
    href: "/user/profile",
    icon: <FaUser />,
  },
];

export const NAVBAR_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Products",
    href: "#",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
  // {
  //   label: "Contact Us",
  //   href: "/contact-us",
  // },
];

// {
//     label: "Blogs",
//     href: "/blogs",
//   },
//   {
//     label: "About Us",
//     href: "/about-us",
//   },
//   {
//     label: "Our Story",
//     href: "/our-story",
//   },
//   {
//     label: "Contact Us",
//     href: "/contact-us",
//   },
