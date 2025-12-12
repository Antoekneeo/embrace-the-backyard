import type { Metadata } from "next";
import { Inter, Cormorant } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Embrace the Backyard",
  description: "Landscaping and outdoor living design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased bg-sand text-dark`}
      >
        <header className="sticky top-0 z-50 w-full border-b border-dark/10 bg-sand/70 backdrop-blur supports-[backdrop-filter]:bg-sand/60">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/next.svg" alt="Logo" width={28} height={28} className="opacity-70" />
              <span className="text-base sm:text-lg font-semibold text-primary tracking-tight">Embrace the Backyard</span>
            </Link>
            <nav className="hidden items-center gap-5 sm:flex">
              <Link href="/" className="text-dark/80 transition-colors hover:text-primary">Home</Link>
              <Link href="/about" className="text-dark/80 transition-colors hover:text-primary">About</Link>
              <Link href="/contact" className="text-dark/80 transition-colors hover:text-primary">Contact</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-20 border-t border-dark/10 bg-sand/80 py-10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 text-sm text-dark/70 sm:px-6 sm:grid-cols-3">
            <div>
              <div className="mb-2 text-base font-semibold text-primary [font-family:var(--font-heading)]">Embrace the Backyard</div>
              <p>Practical guidance for safer, kinder backyard wildlife encounters.</p>
            </div>
            <nav className="space-y-2">
              <div className="text-base font-semibold text-primary [font-family:var(--font-heading)]">Pages</div>
              <Link href="/" className="block hover:text-primary">Home</Link>
              <Link href="/about" className="block hover:text-primary">About</Link>
              <Link href="/contact" className="block hover:text-primary">Contact</Link>
            </nav>
            <div className="space-y-2">
              <div className="text-base font-semibold text-primary [font-family:var(--font-heading)]">Contact</div>
              <a href="mailto:embracethebackyard@gmail.com" className="hover:text-primary">embracethebackyard@gmail.com</a>
            </div>
            <div className="col-span-full pt-4 text-xs text-dark/60">© {new Date().getFullYear()} Embrace the Backyard. All rights reserved.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
