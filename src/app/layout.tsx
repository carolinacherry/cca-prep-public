"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";
import { domains } from "@/lib/exam-data";

function ProgressRing({
  percentage,
  size = 32,
  strokeWidth = 3,
  active = false,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  active?: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className={active ? "text-cream/30" : "text-warm-border"}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={active ? "text-cream" : "text-olive"}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className={`text-[8px] font-semibold ${active ? "fill-cream" : "fill-olive-light"}`}
      >
        {percentage}%
      </text>
    </svg>
  );
}

function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-72 border-r border-warm-border bg-cream transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <Link
            href="/"
            className="flex items-center gap-3 border-b border-warm-border px-6 py-5"
            onClick={onClose}
          >
            <img src="/claude-logo.svg" alt="Claude" className="h-6 w-6" />
            <div>
              <div className="font-serif text-lg font-bold text-olive">
                CCA Prep
              </div>
              <div className="text-xs text-warm-gray">Foundations</div>
            </div>
          </Link>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-warm-gray-light">
              Domains
            </div>
            {domains.map((domain) => {
              const isActive = pathname === `/domain/${domain.id}`;
              return (
                <Link
                  key={domain.id}
                  href={`/domain/${domain.id}`}
                  onClick={onClose}
                  className={`mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-olive text-cream"
                      : "text-foreground hover:bg-warm-border-light"
                  }`}
                >
                  <ProgressRing percentage={domain.weight} active={isActive} />
                  <span className="line-clamp-2 leading-snug">
                    {domain.name}
                  </span>
                </Link>
              );
            })}

            <div className="mt-6 mb-2 px-3 text-xs font-medium uppercase tracking-wider text-warm-gray-light">
              Exam Info
            </div>
            <div className="space-y-1 px-3 text-xs text-warm-gray">
              <div className="flex justify-between">
                <span>Questions</span>
                <span className="text-foreground">60</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="text-foreground">120 min</span>
              </div>
              <div className="flex justify-between">
                <span>Passing</span>
                <span className="text-foreground">720/1000</span>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>CCA Prep - Claude Certified Architect Study Guide</title>
        <meta
          name="description"
          content="Interactive study guide for the Claude Certified Architect — Foundations certification exam"
        />
      </head>
      <body className="antialiased">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="lg:pl-72">
          <header className="sticky top-0 z-20 flex h-14 items-center border-b border-warm-border bg-cream/80 px-4 backdrop-blur-sm lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-2 text-warm-gray hover:bg-warm-border-light hover:text-foreground"
              aria-label="Open sidebar"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </button>
            <img src="/claude-logo.svg" alt="Claude" className="ml-3 h-5 w-5" />
            <span className="ml-1 font-serif text-sm font-bold text-olive">
              CCA Prep
            </span>
          </header>

          <main className="min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
