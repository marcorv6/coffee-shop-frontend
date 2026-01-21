"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Printer,
  Share,
  Search,
  Filter,
  CreditCard,
  Banknote,
  Wallet,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const salesData = [
  {
    date: "24 oct. 2023",
    time: "14:20 PM",
    id: "#MAL-1029",
    items: "2x Espresso, 1x Croissant de Almendras, 1x Latte Frío...",
    paymentType: "card",
    paymentLabel: "Visa •••• 1234",
    status: "success",
    total: "$24.50",
  },
  {
    date: "24 oct. 2023",
    time: "13:55 PM",
    id: "#MAL-1028",
    items: "1x Tostada de Aguacate, 1x Flat White",
    paymentType: "cash",
    paymentLabel: "Efectivo",
    status: "success",
    total: "$16.80",
  },
  {
    date: "24 oct. 2023",
    time: "13:12 PM",
    id: "#MAL-1027",
    items: "3x Cappuccino, 3x Muffin de Arándanos",
    paymentType: "wallet",
    paymentLabel: "Apple Pay",
    status: "refunded",
    total: "$32.10",
  },
  {
    date: "24 oct. 2023",
    time: "12:45 PM",
    id: "#MAL-1026",
    items: "1x Bagel con Queso Crema, 1x Café Solo",
    paymentType: "card",
    paymentLabel: "Mastercard •••• 9901",
    status: "success",
    total: "$12.50",
  },
];

const paymentIcons = {
  card: CreditCard,
  cash: Banknote,
  wallet: Wallet,
};

const statusStyles = {
  success: "bg-success/10 text-success",
  refunded: "bg-warning/10 text-warning-foreground",
};

const tabs = ["Hoy", "Últimos 7 días", "Últimos 30 días", "Último Trimestre", "Rango Personalizado"];

export default function VentasPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

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
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tight">
            Historial de Ventas
          </h2>
          <div className="flex items-center gap-2 text-foreground-muted text-sm">
            <span className="animate-spin">⟳</span>
            <p>Sincronizado: 24 oct. 2023 a las 14:45</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimir Todo
          </Button>
          <Button className="gap-2">
            <Share className="h-4 w-4" />
            Exportar Reporte
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { label: "Ingresos Totales", value: "$12,450.00", trend: "12.5%", subtitle: "Comparado con el mes anterior" },
          { label: "Ticket Promedio", value: "$18.50", trend: "3.2%", subtitle: "Tendencia: Alza Estacional" },
          { label: "Transacciones Totales", value: "672", trend: "8.1%", subtitle: "Periodos de alto tráfico: 08:00 - 10:30" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="bg-card-cream p-6 rounded-2xl border-2 border-border shadow-sm relative overflow-hidden group cursor-pointer transition-all duration-200 hover:border-[var(--border-hover)] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
          >
            <p className="text-foreground-muted text-sm font-semibold uppercase tracking-wider mb-2">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-extrabold">{stat.value}</h3>
              <span className="text-success text-sm font-bold flex items-center">
                <TrendingUp className="h-3 w-3" />
                {stat.trend}
              </span>
            </div>
            <p className="text-xs text-foreground-muted mt-4 italic">
              {stat.subtitle}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeInUp} className="space-y-4">
        <div className="flex items-center gap-6 border-b border-border mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(i)}
              className={cn(
                "pb-4 px-2 border-b-4 font-semibold text-sm whitespace-nowrap transition-all duration-200",
                selectedTab === i
                  ? "border-primary text-foreground font-bold"
                  : "border-transparent text-foreground-muted hover:text-foreground hover:border-border"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted h-5 w-5 transition-colors duration-200 group-focus-within:text-primary" />
            <input
              className="w-full bg-card border-2 border-border rounded-xl pl-11 pr-4 py-2.5 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-[var(--border-hover)]"
              placeholder="Buscar por ID de pedido o artículo..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-card border-2 border-border rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-[var(--border-hover)] cursor-pointer">
              <option>Método de Pago</option>
              <option>Efectivo</option>
              <option>Visa</option>
              <option>Mastercard</option>
              <option>Billetera Digital</option>
            </select>
            <select className="bg-card border-2 border-border rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-[var(--border-hover)] cursor-pointer">
              <option>Estado: Todos</option>
              <option>Completado</option>
              <option>Reembolsado</option>
              <option>Anulado</option>
            </select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        variants={fadeInUp}
        className="bg-card rounded-2xl border-2 border-border overflow-hidden shadow-sm transition-all duration-200 hover:border-[var(--border-hover)]"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground-muted">
                  Fecha y Hora
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground-muted">
                  ID Pedido
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground-muted">
                  Artículos Vendidos
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground-muted">
                  Pago
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground-muted">
                  Estado
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground-muted text-right">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {salesData.map((sale) => {
                const PaymentIcon =
                  paymentIcons[sale.paymentType as keyof typeof paymentIcons];
                const isSelected = selectedRow === sale.id;
                return (
                  <tr
                    key={sale.id}
                    onClick={() => setSelectedRow(isSelected ? null : sale.id)}
                    className={cn(
                      "transition-all duration-200 cursor-pointer group",
                      isSelected
                        ? "bg-primary/5"
                        : "hover:bg-card-cream/50"
                    )}
                  >
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold">{sale.date}</p>
                      <p className="text-xs text-foreground-muted">
                        {sale.time}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "text-sm font-mono font-medium transition-colors duration-200",
                        isSelected ? "text-primary" : "text-primary group-hover:text-[var(--primary-hover)]"
                      )}>
                        {sale.id}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm text-foreground-muted max-w-xs truncate">
                        {sale.items}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <PaymentIcon className="h-4 w-4 text-foreground-muted" />
                        <span className="text-sm font-medium">
                          {sale.paymentLabel}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={cn(
                          "px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md",
                          statusStyles[sale.status as keyof typeof statusStyles]
                        )}
                      >
                        {sale.status === "success" ? "Exitoso" : "Reembolsado"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <p
                        className={cn(
                          "text-base font-extrabold",
                          sale.status === "refunded" &&
                            "text-foreground-muted line-through"
                        )}
                      >
                        {sale.total}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-muted/50 flex items-center justify-between border-t border-border">
          <p className="text-xs text-foreground-muted font-medium">
            Mostrando 1-15 de 672 transacciones
          </p>
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
            <span className="text-foreground-muted text-xs">...</span>
            <Button variant="outline" size="sm" className="w-8 h-8" onClick={() => setCurrentPage(45)}>
              45
            </Button>
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => p + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
