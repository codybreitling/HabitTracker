import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import NavBar from "./NavBar";
import LocalizationWrapper from "./LocalizationWrapper";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Track your habits",
};

export default function RootLayout(props: any) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <LocalizationWrapper>
              <div className="mt-5">
                <NavBar />
              </div>
              <main style={{ flex: 1 }}>{props.children}</main>
            </LocalizationWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
