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
    name: "Progress",
    path: "/progress",
  },
  {
    name: "Journal",
    path: "/journal",
  },
  {
    name: "AI Tips",
    path: "/ai-tips",
  },
  {
    name: "Settings",
    path: "/settings",
  },
];