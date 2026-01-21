"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  UserPlus,
  Shield,
  Coffee,
  Users,
  Download,
  Settings2,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "gerente" | "barista";
  status: "activo" | "inactivo";
  avatar?: string;
}

const usersData: User[] = [
  {
    id: "ML-8821",
    name: "Mateo Rivera",
    email: "mateo@maloca.com",
    role: "admin",
    status: "activo",
    avatar: "MR",
  },
  {
    id: "ML-4402",
    name: "Sofía Castro",
    email: "sofia.c@maloca.com",
    role: "gerente",
    status: "activo",
    avatar: "SC",
  },
  {
    id: "ML-1029",
    name: "Carlos Ruiz",
    email: "carlos.barista@maloca.com",
    role: "barista",
    status: "activo",
    avatar: "CR",
  },
  {
    id: "ML-3101",
    name: "Ana Gómez",
    email: "ana.g@maloca.com",
    role: "barista",
    status: "inactivo",
    avatar: "AG",
  },
  {
    id: "ML-5567",
    name: "Luis Mendoza",
    email: "luis.m@maloca.com",
    role: "barista",
    status: "activo",
    avatar: "LM",
  },
  {
    id: "ML-7823",
    name: "María Torres",
    email: "maria.t@maloca.com",
    role: "gerente",
    status: "activo",
    avatar: "MT",
  },
];

const roleStyles = {
  admin: {
    bg: "bg-foreground/10",
    text: "text-foreground",
    label: "Administrador",
  },
  gerente: {
    bg: "bg-warning/10",
    text: "text-warning-foreground",
    label: "Gerente",
  },
  barista: {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    label: "Barista",
  },
};

const statusStyles = {
  activo: {
    dot: "bg-success",
    text: "text-success",
    label: "Activo",
  },
  inactivo: {
    dot: "bg-foreground-muted",
    text: "text-foreground-muted",
    label: "Inactivo",
  },
};

export default function UsuariosPage() {
  const [users, setUsers] = useState(usersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
    setShowDeleteConfirm(null);
  };

  const stats = [
    {
      label: "Total Usuarios",
      value: users.length.toString().padStart(2, "0"),
      badge: "+2 este mes",
      badgeColor: "text-success bg-success/10",
    },
    {
      label: "Administradores",
      value: users.filter((u) => u.role === "admin").length.toString().padStart(2, "0"),
      icon: Shield,
    },
    {
      label: "Baristas",
      value: users.filter((u) => u.role === "barista").length.toString().padStart(2, "0"),
      icon: Coffee,
    },
    {
      label: "Sesiones Activas",
      value: users.filter((u) => u.status === "activo").length.toString().padStart(2, "0"),
      avatars: users.filter((u) => u.status === "activo").slice(0, 3),
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-black tracking-tight">
            Administración de Usuarios
          </h2>
          <p className="text-foreground-muted mt-1 font-medium">
            Gestiona los accesos y roles de tu equipo de trabajo en Maloca.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Settings2 className="h-4 w-4" />
            Editar Permisos
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Añadir Usuario
          </Button>
        </div>
      </motion.div>

      {/* Table Container */}
      <motion.div
        variants={fadeInUp}
        className="bg-card border-2 border-border rounded-2xl overflow-hidden shadow-sm transition-all duration-200 hover:border-[var(--border-hover)]"
      >
        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted h-5 w-5 transition-colors duration-200 group-focus-within:text-primary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-muted border-2 border-transparent rounded-xl text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:bg-[var(--muted-hover)]"
              placeholder="Buscar por nombre o correo..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold text-foreground-muted uppercase tracking-widest">
                  Usuario
                </th>
                <th className="px-6 py-4 text-xs font-bold text-foreground-muted uppercase tracking-widest">
                  Correo Electrónico
                </th>
                <th className="px-6 py-4 text-xs font-bold text-foreground-muted uppercase tracking-widest">
                  Rol
                </th>
                <th className="px-6 py-4 text-xs font-bold text-foreground-muted uppercase tracking-widest">
                  Estado
                </th>
                <th className="px-6 py-4 text-xs font-bold text-foreground-muted uppercase tracking-widest text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence mode="popLayout">
                {filteredUsers.map((user) => {
                  const role = roleStyles[user.role];
                  const status = statusStyles[user.status];
                  const isSelected = selectedUser === user.id;
                  const isHovered = hoveredRow === user.id;
                  const isDeleting = showDeleteConfirm === user.id;

                  return (
                    <motion.tr
                      key={user.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      onClick={() => setSelectedUser(isSelected ? null : user.id)}
                      onMouseEnter={() => setHoveredRow(user.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={cn(
                        "transition-all duration-200 cursor-pointer group",
                        isSelected
                          ? "bg-primary/5"
                          : isHovered
                            ? "bg-muted/30"
                            : ""
                      )}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "size-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-200",
                              user.role === "admin"
                                ? "bg-card-cream text-foreground"
                                : user.role === "gerente"
                                  ? "bg-warning/10 text-warning-foreground"
                                  : "bg-muted text-foreground-muted",
                              isSelected || isHovered
                                ? "border-primary/30 scale-105"
                                : "border-border"
                            )}
                          >
                            {user.avatar}
                          </div>
                          <div>
                            <p
                              className={cn(
                                "text-sm font-bold transition-colors duration-200",
                                isSelected && "text-primary"
                              )}
                            >
                              {user.name}
                            </p>
                            <p className="text-xs text-foreground-muted">
                              ID: {user.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-foreground-muted">
                          {user.email}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-transform duration-200",
                            role.bg,
                            role.text,
                            isHovered && "scale-105"
                          )}
                        >
                          {role.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={cn("flex items-center gap-1.5", status.text)}>
                          <span
                            className={cn(
                              "size-2 rounded-full",
                              status.dot,
                              user.status === "activo" && "animate-pulse"
                            )}
                          />
                          <span className="text-xs font-bold">{status.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {isDeleting ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-2 bg-destructive/10 rounded-lg px-3 py-1"
                            >
                              <span className="text-xs font-bold text-destructive">
                                ¿Eliminar?
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteUser(user.id);
                                }}
                                className="p-1 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded transition-all duration-200"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowDeleteConfirm(null);
                                }}
                                className="p-1 text-foreground-muted hover:bg-muted rounded transition-all duration-200"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </motion.div>
                          ) : (
                            <>
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className={cn(
                                  "p-2 rounded-lg transition-all duration-200",
                                  isHovered
                                    ? "text-foreground hover:bg-muted"
                                    : "text-foreground-muted opacity-0"
                                )}
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowDeleteConfirm(user.id);
                                }}
                                className={cn(
                                  "p-2 rounded-lg transition-all duration-200",
                                  isHovered
                                    ? "text-foreground-muted hover:text-destructive hover:bg-destructive/10"
                                    : "text-foreground-muted opacity-0"
                                )}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <Users className="h-12 w-12 text-foreground-muted mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">No se encontraron usuarios</h3>
            <p className="text-foreground-muted text-sm">
              Intenta con otro término de búsqueda
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 bg-muted/50 border-t border-border flex items-center justify-between">
          <p className="text-xs text-foreground-muted font-medium">
            Mostrando {filteredUsers.length} de {users.length} usuarios registrados
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[1, 2, 3].map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="h-8 w-8"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="p-5 bg-card border-2 border-border rounded-2xl cursor-pointer transition-all duration-200 hover:border-[var(--border-hover)] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm group"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-foreground-muted mb-2">
              {stat.label}
            </p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-black transition-colors duration-200 group-hover:text-primary">
                {stat.value}
              </span>
              {stat.badge && (
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full",
                    stat.badgeColor
                  )}
                >
                  {stat.badge}
                </span>
              )}
              {stat.icon && (
                <stat.icon className="h-6 w-6 text-foreground-muted/30 transition-transform duration-200 group-hover:scale-110" />
              )}
              {stat.avatars && (
                <div className="flex -space-x-2">
                  {stat.avatars.map((user, j) => (
                    <div
                      key={user.id}
                      className="size-6 rounded-full border-2 border-card bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary overflow-hidden transition-transform duration-200 hover:scale-110 hover:z-10"
                    >
                      {user.avatar}
                    </div>
                  ))}
                  {users.filter((u) => u.status === "activo").length > 3 && (
                    <div className="size-6 rounded-full border-2 border-card bg-primary flex items-center justify-center text-[8px] font-bold text-primary-foreground">
                      +{users.filter((u) => u.status === "activo").length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
