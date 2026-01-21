"use client";

import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-background custom-scrollbar">
          <AdminHeader />
          <div className="p-8 max-w-[1400px] mx-auto">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
