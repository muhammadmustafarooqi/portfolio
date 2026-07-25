import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Mustafa Hussain || Full-Stack Developer Portfolio",
  description:
    "Full-Stack Software Engineer specializing in MERN Stack, Next.js, REST APIs & Creative Web Animations.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
