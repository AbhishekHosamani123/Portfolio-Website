import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Abhishek Umesh Hosamani | Software Engineer & AI Systems Architect",
  description: "Portfolio of Abhishek Umesh Hosamani - Software Engineer specializing in LLM integrations, RAG architecture, automation pipelines, and high-performance full-stack web applications.",
  keywords: [
    "Abhishek Umesh Hosamani",
    "AI Engineer",
    "Software Engineer",
    "Generative AI Developer",
    "RAG",
    "Pinecone",
    "Supabase",
    "FastAPI",
    "Next.js"
  ],
  authors: [{ name: "Abhishek Umesh Hosamani" }],
  openGraph: {
    title: "Abhishek Umesh Hosamani | Software Engineer & AI Systems Architect",
    description: "Portfolio of Abhishek Umesh Hosamani - Software Engineer specializing in LLM integrations, RAG architecture, automation pipelines, and high-performance full-stack web applications.",
    type: "website",
    url: "https://abhishekhosamani.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Umesh Hosamani | Software Engineer & AI Systems Architect",
    description: "Portfolio of Abhishek Umesh Hosamani - Software Engineer specializing in LLM integrations, RAG architecture, automation pipelines, and high-performance full-stack web applications.",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Abhishek Umesh Hosamani",
  "jobTitle": "Software Engineer & Generative AI Developer",
  "knowsAbout": [
    "Software Engineering",
    "Artificial Intelligence",
    "Large Language Models",
    "Retrieval-Augmented Generation (RAG)",
    "Backend Systems",
    "Full-Stack Development"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Inera Software"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "KLS Gogte College of Commerce"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
