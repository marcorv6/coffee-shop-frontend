"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  Package,
  Users,
  UserCog,
  Landmark,
  Settings,
  Coffee,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Panel Principal", href: "/admin", icon: LayoutDashboard },
  { name: "Ventas", href: "/admin/ventas", icon: Receipt },
  { name: "Inventario", href: "/admin/inventario", icon: Package },
  { name: "Personal", href: "/admin/personal", icon: Users },
  { name: "Usuarios", href: "/admin/usuarios", icon: UserCog },
  { name: "Contabilidad", href: "/admin/contabilidad", icon: Landmark },
  { name: "Configuración", href: "/admin/configuracion", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-card border-r border-border flex flex-col justify-between p-6 h-screen sticky top-0">
      <div className="flex flex-col gap-8">
        {/* Logo */}
        <Link
          href="/admin"
          className="flex items-center gap-3 group transition-opacity hover:opacity-80"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg transition-transform group-hover:scale-105 group-active:scale-95">
            <Coffee className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-foreground text-lg font-extrabold leading-tight">
              Maloca Admin
            </h1>
            <p className="text-foreground-muted text-xs font-medium uppercase tracking-widest">
              Sistema de Gestión
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground-muted hover:bg-muted hover:text-foreground"
                )}
              >
                {/* Active indicator bar */}
                <div
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full transition-all duration-200",
                    isActive
                      ? "h-8 bg-primary"
                      : "h-0 bg-transparent group-hover:h-4 group-hover:bg-border"
                  )}
                />
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    isActive
                      ? "text-primary"
                      : "group-hover:scale-110 group-hover:text-foreground"
                  )}
                />
                <p
                  className={cn(
                    "text-sm transition-all duration-200",
                    isActive
                      ? "font-bold text-primary"
                      : "font-semibold group-hover:font-bold group-hover:translate-x-0.5"
                  )}
                >
                  {item.name}
                </p>
                {/* Hover highlight */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4">
        {/* System Status */}
        <div className="bg-card-cream p-4 rounded-xl transition-colors hover:bg-[var(--muted-hover)] cursor-default">
          <p className="text-xs font-bold text-foreground-muted uppercase mb-2">
            Estado del Sistema
          </p>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-success animate-pulse"></div>
            <p className="text-xs text-foreground">Terminales en línea</p>
          </div>
        </div>

        {/* Report Button */}
        <button className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all duration-200 hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:bg-[var(--primary-active)] active:shadow-sm active:translate-y-0 active:scale-[0.98]">
          <Download className="h-4 w-4 transition-transform group-hover:animate-bounce" />
          <span>Generar Reporte</span>
        </button>
      </div>
    </aside>
  );
}
