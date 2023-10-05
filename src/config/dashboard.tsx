import { Role } from "@/db/schema/user";

type Navigation = {
  name: string;
  href: GetRoutes;
  icon: string;
  clearance: Role[];
};
export const dashboardNav: Navigation[] = [
  {
    name: "settings",
    href: "/dashboard/settings",
    icon: "i-lucide-settings",
    clearance: ["customer", "owner", "admin"],
  },
];
