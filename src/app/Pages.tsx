export interface Page {
  name: string;
  path: string;
}

export const Pages: Page[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Habits",
    path: "/habits",
  },
  {
    name: "AI",
    path: "/ai",
  },
  {
    name: "Progress",
    path: "/progress",
  },
  {
    name: "Journal",
    path: "/journal",
  },
  {
    name: "Settings",
    path: "/settings",
  },
];