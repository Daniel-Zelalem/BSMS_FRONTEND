import { Inter } from "next/font/google";
import ReduxProvider from "@/redux/provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "BSMS",
  description:
    "Final Project For BSc Developed By WKU Software Engineering Student(GZMN)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
