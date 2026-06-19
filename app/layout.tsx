import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Halifax Transit",
  description: "Take the journey with us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="bg-fog text-asphalt">{children}</body>
    </html>
  );
}
