"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  DollarSign,
  Clock,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const staffMembers = [
  {
    id: 1,
    name: "María García",
    role: "Barista Principal",
    status: "active",
    shift: "08:00 - 16:00",
    hoursThisWeek: "32h",
    avatar: null,
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    role: "Barista",
    status: "active",
    shift: "10:00 - 18:00",
    hoursThisWeek: "38h",
    avatar: null,
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Cajera",
    status: "break",
    shift: "08:00 - 16:00",
    hoursThisWeek: "28h",
    avatar: null,
  },
  {
    id: 4,
    name: "Luis Hernández",
    role: "Barista",
    status: "inactive",
    shift: "Libre Hoy",
    hoursThisWeek: "40h",
    avatar: null,
  },
  {
    id: 5,
    name: "Sofia Rodríguez",
    role: "Supervisora",
    status: "active",
    shift: "09:00 - 17:00",
    hoursThisWeek: "36h",
    avatar: null,
  },
];

const statusStyles = {
  active: { bg: "bg-success/10", text: "text-success", label: "Activo" },
  break: { bg: "bg-warning/10", text: "text-warning-foreground", label: "En Descanso" },
  inactive: { bg: "bg-muted", text: "text-foreground-muted", label: "Fuera de Turno" },
};

const tabs = ["Todos", "En Turno", "En Descanso", "Fuera de Turno"];

export default function PersonalPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold mb-1">Gestión de Personal</h2>
          <p className="text-foreground-muted">
            Administre turnos, rendimiento y asistencia del equipo.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Ver Calendario
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Agregar Personal
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { icon: Users, label: "Personal Total", value: "12", subtitle: "3 nuevos este mes" },
          { icon: Clock, label: "En Turno Ahora", value: "5", subtitle: "2 en descanso" },
          { icon: DollarSign, label: "Nómina Mensual", value: "$8,450", subtitle: "Próximo pago: 15 ene" },
          { icon: Calendar, label: "Turnos Esta Semana", value: "42", subtitle: "8 intercambios pendientes" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="bg-card p-6 rounded-xl border-2 border-border shadow-sm cursor-pointer transition-all duration-200 hover:border-[var(--border-hover)] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-transform duration-200 group-hover:scale-110">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <h4 className="text-foreground-muted text-sm font-medium">
              {stat.label}
            </h4>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-foreground-muted mt-1">{stat.subtitle}</p>
          </div>
        ))}
      </motion.div>

      {/* Staff Table */}
      <motion.div
        variants={fadeInUp}
        className="bg-card border-2 border-border rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:border-[var(--border-hover)]"
      >
        {/* Tabs */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(i)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                  selectedTab === i
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground-muted hover:bg-muted hover:text-foreground active:scale-95"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-foreground-muted text-[11px] uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Empleado</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Turno Actual</th>
                <th className="px-6 py-4">Horas Esta Semana</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {staffMembers.map((member) => {
                const status = statusStyles[member.status as keyof typeof statusStyles];
                const isSelected = selectedStaff === member.id;
                return (
                  <tr
                    key={member.id}
                    onClick={() => setSelectedStaff(isSelected ? null : member.id)}
                    className={cn(
                      "transition-all duration-200 cursor-pointer group",
                      isSelected ? "bg-primary/5" : "hover:bg-muted/30"
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border-2 transition-all duration-200",
                            isSelected
                              ? "border-primary scale-105"
                              : "border-transparent group-hover:border-primary/30 group-hover:scale-105"
                          )}
                        >
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <p className={cn(
                          "text-sm font-bold transition-colors duration-200",
                          isSelected && "text-primary"
                        )}>
                          {member.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground-muted">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight",
                          status.bg,
                          status.text
                        )}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground-muted">
                        {member.shift}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium">
                        {member.hoursThisWeek}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <span className="text-xs text-foreground-muted">
            Mostrando 1 a 5 de 12 empleados
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[1, 2, 3].map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="w-8 h-8"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => p + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Solicitudes de Turno", count: "4 pendientes", action: "Revisar" },
          { title: "Tiempo Extra", count: "2 solicitudes", action: "Aprobar" },
          { title: "Evaluaciones", count: "3 por completar", action: "Ver" },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-card-cream p-6 rounded-xl border-2 border-border shadow-sm cursor-pointer transition-all duration-200 hover:border-[var(--border-hover)] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm group"
          >
            <h4 className="font-bold mb-1 transition-colors duration-200 group-hover:text-primary">
              {item.title}
            </h4>
            <p className="text-sm text-foreground-muted mb-4">{item.count}</p>
            <Button variant="outline" size="sm" className="w-full">
              {item.action}
            </Button>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
