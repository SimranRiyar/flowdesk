"use client";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

interface NavbarProps {
  appName: string;
  links: { label: string; href: string }[];
}

export default function Navbar({ appName, links }: NavbarProps) {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4 flex items-center justify-between">
      <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{appName}</span>
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <DarkModeToggle />
        <Link
          href="/login"
          className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}