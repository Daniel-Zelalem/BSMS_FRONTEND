import { Roboto } from "next/font/google";
import "../../globals.css";

const robot = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "BSMS",
  description:
    "Final Project For BSc Developed By WKU Software Engineering Student(GZMN)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={robot.className}>{children}</body>
    </html>
  );
}
