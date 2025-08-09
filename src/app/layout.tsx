import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { NavBar } from "./(components)/nav-bar";

const lora = Lora({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecipeIO",
  description: "Recipe app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={lora.className}
      >
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
