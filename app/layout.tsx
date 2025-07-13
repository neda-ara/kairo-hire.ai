import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Header } from "@/components/header";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KairoHire.ai",
  description:
    "AI-powered career guidance to help you grow, prepare, and get hired.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster richColors />
            <footer className="bg-background border-t border-border mt-20">
              <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center space-y-2 text-center">
                <p className="text-sm text-muted-foreground italic">
                  Helping you make career moves that matter.
                </p>
                <p className="text-xs text-muted-foreground/70">
                  © {new Date().getFullYear()} KairoHire.ai. All rights
                  reserved.
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
