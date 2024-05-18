import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "../globals.css";

const robot = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "BSMS",
  description:
    "Final Project For BSc Developed By WKU Software Engineering Student(GZMN)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={robot.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
