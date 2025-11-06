import { inter } from "@/config/fonts";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Coolcloset | Shop',
  description: 'Tienda virtual de productos'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>{children}
      </body>
    </html>
  );
}
