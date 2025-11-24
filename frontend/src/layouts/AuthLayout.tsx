import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Todo List App
        </h1>

        {children}

        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Gustavo — All rights reserved.
        </p>
      </div>
    </div>
  );
}