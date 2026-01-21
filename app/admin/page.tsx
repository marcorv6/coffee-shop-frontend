"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  ShoppingCart,
  BadgeCheck,
  UserPlus,
  Filter,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { SalesChart } from "@/components/ui/sales-chart";
import { InventoryAlert } from "@/components/ui/inventory-alert";
import { TransactionTable } from "@/components/ui/transaction-table";
import { StaffCard } from "@/components/ui/staff-card";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const transactions = [
  {
    id: "#ML-8942",
    items: "Latte + Tostada de Aguacate",
    status: "completed" as const,
    total: "$14.50",
  },
  {
    id: "#ML-8941",
    items: "Espresso Doble",
    status: "preparing" as const,
    total: "$4.25",
  },
  {
    id: "#ML-8940",
    items: "Cold Brew + Muffin",
    status: "completed" as const,
    total: "$10.20",
  },
  {
    id: "#ML-8939",
    items: "Matcha Latte Helado",
    status: "cancelled" as const,
    total: "$6.50",
  },
];

const staffMembers = [
  { name: "Marco Santos", role: "Barista Principal", hoursWorked: "06:45h" },
  { name: "Sarah Jenkins", role: "Personal de Servicio", hoursWorked: "04:12h" },
  { name: "Liam Wu", role: "Personal de Cocina", hoursWorked: "03:30h" },
  { name: "Sophie Miller", role: "Barista", hoursWorked: "02:15h" },
];

export default function AdminDashboard() {
  const today = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
          <h2 className="text-4xl font-black tracking-tight">
            Buen día, Elena
          </h2>
          <p className="text-foreground-muted mt-1">
            Aquí está el resumen de Maloca para el {today}.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Ventas Diarias"
          value="$1,240.50"
          trend={{ value: "12.5%", type: "up" }}
          icon={CreditCard}
          iconColor="text-primary"
          iconBgColor="bg-primary/10"
        />
        <StatCard
          title="Pedidos Activos"
          value="12"
          trend={{ value: "5.2%", type: "up" }}
          icon={ShoppingCart}
          iconColor="text-blue-500"
          iconBgColor="bg-blue-500/10"
        />
        <StatCard
          title="Personal de Turno"
          value="08"
          trend={{ value: "Estable", type: "neutral" }}
          icon={BadgeCheck}
          iconColor="text-amber-500"
          iconBgColor="bg-amber-500/10"
        />
        <StatCard
          title="Nuevos Clientes"
          value="42"
          trend={{ value: "8.4%", type: "up" }}
          icon={UserPlus}
          iconColor="text-emerald-500"
          iconBgColor="bg-emerald-500/10"
        />
      </motion.div>

      {/* Charts and Alerts Row */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 xl:grid-cols-3 gap-8"
      >
        <div className="xl:col-span-2">
          <SalesChart />
        </div>
        <div className="bg-card rounded-xl border border-border shadow-sm flex flex-col">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-bold">Alertas de Inventario</h3>
            <p className="text-sm text-foreground-muted">
              Artículos críticos que requieren atención
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            <InventoryAlert
              name="Café en Grano"
              current="2.4kg"
              target="10kg"
              severity="critical"
            />
            <InventoryAlert
              name="Leche Entera"
              current="12L"
              target="30L"
              severity="warning"
            />
            <InventoryAlert
              name="Vasos Ecológicos (M)"
              current="400"
              target="500"
              severity="normal"
            />
          </div>
          <div className="p-4 bg-muted/50 text-center rounded-b-xl">
            <a
              className="text-sm font-bold text-primary hover:underline"
              href="/admin/inventario"
            >
              Ver Inventario Completo
            </a>
          </div>
        </div>
      </motion.div>

      {/* Transactions and Staff Row */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <TransactionTable transactions={transactions} />
        <StaffCard staff={staffMembers} />
      </motion.div>
    </motion.div>
  );
}
