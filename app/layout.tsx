import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./cart/CartContext";
import {Montserrat} from 'next/font/google'
import { Suspense } from "react";

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: "E-Commerce Store",
  description: "Shop the best products online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-gray-50 flex flex-col min-h-screen`}>
        <CartProvider>
          <Suspense fallback={
            <header className="sticky top-0 z-50 bg-[#0758a8] text-white px-4 md:px-8 py-4 shadow-md">
              <div className="flex items-center justify-between gap-3 md:gap-4">
                <div className="text-2xl md:text-4xl font-bold whitespace-nowrap">Logo</div>
                <div className="hidden lg:flex flex-1 max-w-xl h-10 bg-white/10 rounded-md animate-pulse"></div>
                <div className="w-20 h-10 bg-white/10 rounded animate-pulse"></div>
              </div>
            </header>
          }>
            <Header />
          </Suspense>
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
