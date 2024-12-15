// import dynamic from "next/dynamic";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/_components/Navbar";
import { VoyagerProvider } from "./voyagerContext";
import "react-datepicker/dist/react-datepicker.css";
import { ColorModeProvider } from "./colorModeContext";
// const ColorModeProvider = dynamic(() => import('./colorModeContext').then((mod) => mod.ColorModeProvider), {
//   ssr: false // This ensures the component is not SSR'd
// });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Voyager",
  description: "Car Rental Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ColorModeProvider>
          <VoyagerProvider>
            <section className="flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-slate-100 min-h-dvh">
              <Navbar />
              {children}
            </section>
          </VoyagerProvider>
        </ColorModeProvider>
      </body>
    </html>
  );
}
