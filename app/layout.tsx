import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "../components/ToastProvider";
import ThemeProvider from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "FlowDesk",
  description: "SaaS admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}