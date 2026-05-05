import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VapeStore — Premium Vapes & Pods",
  description: "Los mejores vapes, pods y e-liquids. Envío inmediato vía WhatsApp.",
  keywords: "vape, pods, e-liquid, comprar vape, vape argentina",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
