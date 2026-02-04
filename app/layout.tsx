import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./cart/CartContext";
import {Inter} from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' });

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
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        <CartProvider>
          <Header />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
