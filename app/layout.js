import { Inter } from "next/font/google";
import "./globals.css";
import { InfoProvider } from "@/context/infoContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Management app",
  description: "Created for ESRS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InfoProvider>
          <section>{children}</section>
        </InfoProvider>
      </body>
    </html>
  );
}
