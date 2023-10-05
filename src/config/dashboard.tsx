import { Role } from "@/db/schema/user";

type Navigation = {
  name: string;
  href: string;
  icon: string;
  clearance: Role[];
};
export const dashboardNav: Navigation[] = [
  {
    name: "business",
    href: "/d/business",
    icon: "i-lucide-store",
    clearance: ["owner", "admin"],
  },
  {
    name: "tags",
    href: "/d/tag",
    icon: "i-lucide-tags",
    clearance: ["admin"],
  },
  {
    name: "users",
    href: "/d/users",
    icon: "i-lucide-users",
    clearance: ["admin"],
  },
  {
    name: "settings",
    href: "/d/settings",
    icon: "i-lucide-settings",
    clearance: ["customer", "owner", "admin"],
  },
];
