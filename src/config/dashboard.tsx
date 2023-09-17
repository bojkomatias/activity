import { Role } from "@/db/schema/user";

type Navigation = {
  name: string;
  href: string;
  icon: string;
  clearance: Role[];
};
export const dashboardNav: Navigation[] = [
  {
    name: "Profile",
    href: "/dashboard",
    icon: "i-lucide-settings",
    clearance: ["customer", "owner", "admin"],
  },
  {
    name: "Posts",
    href: "/dashboard/posts",
    icon: "i-lucide-layout-dashboard",
    clearance: ["customer", "owner", "admin"],
  },
  {
    name: "Security",
    href: "/dashboard/security",
    icon: "i-lucide-key-round",
    clearance: ["admin"],
  },
];
