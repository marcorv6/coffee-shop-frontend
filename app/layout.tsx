import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maloca - Sistema de Gestión de Cafetería",
  description: "Sistema integral de gestión para cafeterías Maloca",
  keywords: ["cafetería", "gestión", "coffee shop", "maloca", "administración"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body className="font-display antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
