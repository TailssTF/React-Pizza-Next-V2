import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import "../scss/app.scss";

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
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
