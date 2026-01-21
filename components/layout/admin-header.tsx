"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, Calendar, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { signOut } from "@/lib/auth";
import { useAuth } from "@/hooks/use-auth";

interface AdminHeaderProps {
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

export function AdminHeader({
  userName,
  userRole = "Gerente de Tienda",
  userAvatar,
}: AdminHeaderProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use Firebase user display name or email, fallback to prop
  const displayName = user?.displayName || userName || user?.email?.split("@")[0] || "Usuario";
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    router.push("/login");
  };
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-8 py-4 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted h-5 w-5 transition-colors group-focus-within:text-primary" />
          <input
            className="w-full pl-10 pr-4 py-2 bg-card border-2 border-border rounded-xl text-sm transition-all duration-200 placeholder:text-foreground-muted focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-[var(--border-hover)]"
            placeholder="Buscar transacciones, personal o stock..."
            type="text"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-xl bg-card border-2 border-border text-foreground-muted transition-all duration-200 hover:border-[var(--border-hover)] hover:bg-muted hover:text-foreground active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 size-2.5 bg-destructive rounded-full border-2 border-card animate-pulse"></span>
            <span className="sr-only">Notificaciones</span>
          </button>
          <button className="p-2 rounded-xl bg-card border-2 border-border text-foreground-muted transition-all duration-200 hover:border-[var(--border-hover)] hover:bg-muted hover:text-foreground active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <Calendar className="h-5 w-5" />
            <span className="sr-only">Calendario</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-8 w-[1px] bg-border"></div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-2 -m-2 rounded-xl transition-all duration-200 hover:bg-muted active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{displayName}</p>
              <p className="text-xs text-foreground-muted">{userRole}</p>
            </div>
            <div
              className="size-10 rounded-full bg-primary/20 bg-cover bg-center border-2 border-primary/20 transition-all duration-200 hover:border-primary/40"
              style={
                userAvatar || user?.photoURL
                  ? { backgroundImage: `url('${userAvatar || user?.photoURL}')` }
                  : undefined
              }
            >
              {!userAvatar && !user?.photoURL && (
                <div className="w-full h-full flex items-center justify-center text-primary font-bold text-sm">
                  {displayName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 text-foreground-muted transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-card border-2 border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-border">
                <p className="text-sm font-bold truncate">{displayName}</p>
                <p className="text-xs text-foreground-muted truncate">{user?.email}</p>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground-muted transition-colors hover:bg-muted hover:text-foreground">
                  <User className="h-4 w-4" />
                  <span>Mi Perfil</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground-muted transition-colors hover:bg-muted hover:text-foreground">
                  <Settings className="h-4 w-4" />
                  <span>Configuración</span>
                </button>
              </div>
              <div className="p-2 border-t border-border">
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
