import {Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const outfit = Outfit({
    subsets: ["latin"],
});

export const metadata = {
    title: "SUMMARIFY - AI Powered PDF Summarizer",
    description: "Transform your PDFs into concise summaries with AI power",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body
                className={outfit.className}
            >

            <Provider>
                {children}
                <Toaster />
            </Provider>
            </body>
            </html>

        </ClerkProvider>
    );
}
