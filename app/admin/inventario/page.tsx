"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Wallet,
  Truck,
  History,
  Plus,
  Settings2,
  Search,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const inventoryItems = [
  {
    id: 1,
    name: "Etíope Yirgacheffe",
    description: "Grano Entero, Tueste Ligero",
    category: "Café",
    stockLevel: 85,
    stockAmount: "12.5 kg",
    minThreshold: "5.0 kg",
    unitCost: "$24.00/kg",
    supplier: "Atlas Coffee Importers",
    image: "☕",
  },
  {
    id: 2,
    name: "Leche Orgánica Entera",
    description: "Envases de 1 Galón",
    category: "Lácteos",
    stockLevel: 15,
    stockAmount: "04 Unidades",
    minThreshold: "10 Unidades",
    unitCost: "$5.50/ud",
    supplier: "Meadow Fresh Farms",
    image: "🥛",
    lowStock: true,
  },
  {
    id: 3,
    name: "Croissant de Mantequilla",
    description: "Entrega diaria fresca",
    category: "Repostería",
    stockLevel: 60,
    stockAmount: "24 Unidades",
    minThreshold: "12 Unidades",
    unitCost: "$1.75/ud",
    supplier: "Artisan Bakery Co.",
    image: "🥐",
  },
  {
    id: 4,
    name: "Leche de Avena (Barista Ed.)",
    description: "Envase 1L",
    category: "Lácteos",
    stockLevel: 35,
    stockAmount: "18 Unidades",
    minThreshold: "20 Unidades",
    unitCost: "$4.20/ud",
    supplier: "Oatly Distribution",
    image: "🌾",
    warning: true,
  },
  {
    id: 5,
    name: "Vasos Eco-amigables (12oz)",
    description: "Caja de 500",
    category: "Empaques",
    stockLevel: 95,
    stockAmount: "12 Cajas",
    minThreshold: "2 Cajas",
    unitCost: "$85.00/cj",
    supplier: "EcoSupplies Ltd.",
    image: "🌱",
  },
];

const categories = [
  "Todos los Artículos",
  "Granos de Café",
  "Lácteos y Alternativas",
  "Repostería",
  "Empaques",
];

export default function InventarioPage() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
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
          <h2 className="text-3xl font-bold mb-1">Gestión de Inventario</h2>
          <p className="text-foreground-muted">
            Gestione ingredientes, niveles de stock y costos de proveedores.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Settings2 className="h-4 w-4" />
            Ajustar Inventario
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Añadir Existencias
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { icon: AlertTriangle, label: "Artículos Stock Bajo", value: "12", badge: "Alerta", color: "warning" },
          { icon: Wallet, label: "Valor del Inventario", value: "$4,280.50", badge: "+2.4%", color: "success" },
          { icon: Truck, label: "Entregas Activas", value: "05", badge: "Pendiente", color: "blue" },
          { icon: History, label: "Mermas (Últimos 30d)", value: "$142.00", badge: null, color: "purple" },
        ].map((stat, i) => {
          const colorStyles = {
            warning: { bg: "bg-warning/10", text: "text-warning-foreground" },
            success: { bg: "bg-success/10", text: "text-success" },
            blue: { bg: "bg-blue-500/10", text: "text-blue-500" },
            purple: { bg: "bg-purple-500/10", text: "text-purple-500" },
          };
          const style = colorStyles[stat.color as keyof typeof colorStyles];
          
          return (
            <div
              key={stat.label}
              className="bg-card p-6 rounded-xl border-2 border-border shadow-sm cursor-pointer transition-all duration-200 hover:border-[var(--border-hover)] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-110", style.bg, style.text)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                {stat.badge && (
                  <span className={cn("text-xs font-bold px-2 py-1 rounded", style.bg, style.text)}>
                    {stat.badge}
                  </span>
                )}
              </div>
              <h4 className="text-foreground-muted text-sm font-medium">
                {stat.label}
              </h4>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Table */}
      <motion.div
        variants={fadeInUp}
        className="bg-card border-2 border-border rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:border-[var(--border-hover)]"
      >
        {/* Filters */}
        <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(i)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                  selectedCategory === i
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground-muted hover:bg-muted hover:text-foreground active:scale-95"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted h-5 w-5 transition-colors duration-200 group-focus-within:text-primary" />
            <input
              className="w-full pl-10 pr-4 py-2 bg-muted border-2 border-transparent rounded-lg text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:bg-[var(--muted-hover)]"
              placeholder="Buscar en inventario..."
              type="text"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-foreground-muted text-[11px] uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Nombre del Ingrediente</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Nivel de Stock</th>
                <th className="px-6 py-4">Umbral Mín.</th>
                <th className="px-6 py-4">Costo Unitario</th>
                <th className="px-6 py-4">Proveedor</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventoryItems.map((item) => {
                const isSelected = selectedRow === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedRow(isSelected ? null : item.id)}
                    className={cn(
                      "transition-all duration-200 cursor-pointer group",
                      isSelected ? "bg-primary/5" : "hover:bg-muted/30"
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl transition-transform duration-200 group-hover:scale-110">
                          {item.image}
                        </div>
                        <div>
                          <p className={cn(
                            "text-sm font-bold transition-colors duration-200",
                            isSelected && "text-primary"
                          )}>{item.name}</p>
                          <p className="text-xs text-foreground-muted">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-muted text-foreground-muted text-[10px] font-bold uppercase tracking-tight">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              item.lowStock
                                ? "bg-destructive"
                                : item.warning
                                  ? "bg-warning"
                                  : "bg-success"
                            )}
                            style={{ width: `${item.stockLevel}%` }}
                          ></div>
                        </div>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            item.lowStock && "font-bold text-destructive"
                          )}
                        >
                          {item.stockAmount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground-muted">
                      {item.minThreshold}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {item.unitCost}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground-muted">
                      {item.supplier}
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
            Mostrando 1 a 5 de 42 artículos
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

      {/* Urgent Alert */}
      <motion.div
        variants={fadeInUp}
        className="bg-destructive/10 border-2 border-destructive/20 p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all duration-200 hover:border-destructive/40 hover:bg-destructive/15 active:scale-[0.995]"
      >
        <div className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center text-destructive-foreground shrink-0 transition-transform duration-200 hover:scale-110">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold">Reabastecimiento Urgente Requerido</h4>
          <p className="text-sm text-foreground-muted">
            La Leche Orgánica Entera y otros 2 artículos están por debajo de su
            umbral mínimo. ¿Desea generar una orden de compra?
          </p>
        </div>
        <Button variant="destructive">Crear Orden de Compra</Button>
      </motion.div>
    </motion.div>
  );
}
