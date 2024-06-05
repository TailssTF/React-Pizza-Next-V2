import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import "../scss/app.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const nunito = Nunito({ subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  title: "React Pizza Next",
  description: "Created using create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
