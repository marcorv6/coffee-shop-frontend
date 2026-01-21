"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  Croissant,
  Egg,
  UtensilsCrossed,
  Wine,
  Search,
  Globe,
  Bell,
  Plus,
  ShoppingBag,
  ArrowRight,
  Check,
} from "lucide-react";
import { fadeInUp, staggerContainer, fadeInScale } from "@/lib/animations";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Café", icon: Coffee },
  { name: "Repostería", icon: Croissant },
  { name: "Desayunos", icon: Egg },
  { name: "Almuerzos", icon: UtensilsCrossed },
  { name: "Bebidas Frías", icon: Wine },
];

const coffeeFilters = [
  "Todo el Café",
  "Espresso",
  "Con Leche",
  "Cold Brew",
  "Métodos Manuales",
];

const menuItems = [
  {
    id: 1,
    name: "Cappuccino Artesanal",
    price: "$4.50",
    description:
      "Doble carga de espresso con leche vaporizada y una corona de microespuma aterciopelada.",
    image: "☕",
    badge: "Popular",
    badgeType: "default",
  },
  {
    id: 2,
    name: "V60 Pour Over",
    price: "$5.00",
    description:
      "Granos de origen único preparados con precisión, resaltando acidez brillante y notas florales.",
    image: "🫖",
    badge: null,
    badgeType: null,
  },
  {
    id: 3,
    name: "Cold Brew Nitro",
    price: "$5.50",
    description:
      "Extracción lenta de 12 horas infusionada con nitrógeno para una textura cremosa y sedosa.",
    image: "🧊",
    badge: "Nuevo",
    badgeType: "new",
  },
  {
    id: 4,
    name: "Latte Macchiato",
    price: "$4.75",
    description:
      "Capas artesanales de leche vaporizada y espresso, coronadas con un punto de espuma.",
    image: "🥛",
    badge: null,
    badgeType: null,
  },
  {
    id: 5,
    name: "Espresso Doble",
    price: "$3.50",
    description:
      "Doble carga pura e intensa para los puristas del café. Cuerpo completo con crema dorada.",
    image: "☕",
    badge: null,
    badgeType: null,
  },
  {
    id: 6,
    name: "Mocha Blanco",
    price: "$5.25",
    description:
      "Mezcla dulce de chocolate blanco y espresso intenso, terminado con crema batida.",
    image: "🍫",
    badge: null,
    badgeType: null,
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [cart, setCart] = useState<number[]>([]);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  const cartCount = cart.length;
  const cartTotal =
    "$" +
    cart
      .reduce((acc, id) => {
        const item = menuItems.find((i) => i.id === id);
        return acc + parseFloat(item?.price.replace("$", "") || "0");
      }, 0)
      .toFixed(2);

  const handleAddToCart = (itemId: number) => {
    setAddingToCart(itemId);
    setTimeout(() => {
      setCart([...cart, itemId]);
      setAddingToCart(null);
    }, 300);
  };

  const isInCart = (itemId: number) => cart.includes(itemId);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 border-r border-border bg-card flex flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 group cursor-pointer">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
              <Coffee className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Maloca</h1>
              <p className="text-xs text-foreground-muted uppercase tracking-widest font-semibold">
                Menú Digital
              </p>
            </div>
          </div>

          {/* Category Navigation */}
          <nav className="flex flex-col gap-2">
            {categories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(i)}
                className={cn(
                  "relative flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group",
                  selectedCategory === i
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-foreground-muted hover:bg-muted hover:text-foreground"
                )}
              >
                {/* Active indicator */}
                <div
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full transition-all duration-200",
                    selectedCategory === i
                      ? "h-8 bg-primary-foreground"
                      : "h-0 bg-transparent group-hover:h-4 group-hover:bg-border"
                  )}
                />
                <cat.icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    selectedCategory !== i && "group-hover:scale-110"
                  )}
                />
                <span
                  className={cn(
                    "transition-all duration-200",
                    selectedCategory === i
                      ? "font-bold"
                      : "font-medium group-hover:font-semibold group-hover:translate-x-0.5"
                  )}
                >
                  {cat.name}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-primary/10 rounded-xl transition-colors duration-200 hover:bg-primary/15">
            <p className="text-xs font-semibold text-primary uppercase mb-1">
              Mesa 12
            </p>
            <p className="text-sm text-foreground-muted">
              ¿Necesitas ayuda? Presiona el botón de abajo.
            </p>
          </div>
          <button className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-primary text-primary font-bold transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <Bell className="h-5 w-5" />
            Llamar Mesero
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-10 bg-card/80 backdrop-blur-md z-10 border-b border-border">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted h-5 w-5 transition-colors duration-200 group-focus-within:text-primary" />
              <input
                className="w-full bg-muted border-2 border-transparent rounded-full pl-12 pr-4 h-11 text-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:bg-[var(--muted-hover)]"
                placeholder="Busca tu bebida favorita..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-muted active:scale-95">
              <Globe className="h-5 w-5 text-foreground-muted" />
              <span className="text-sm font-semibold">ES</span>
            </button>
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold transition-all duration-200 hover:bg-primary/20 hover:scale-105 cursor-pointer">
              U
            </div>
          </div>
        </header>

        {/* Menu Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex-1 overflow-y-auto p-10 pb-32 bg-background"
        >
          {/* Section Title */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h2 className="text-3xl font-bold mb-6">Selección del Barista</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {coffeeFilters.map((filter, i) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(i)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                    selectedFilter === i
                      ? "bg-foreground text-background shadow-lg"
                      : "bg-card border-2 border-border hover:border-[var(--border-hover)] hover:bg-muted active:scale-95"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Menu Grid */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {menuItems.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInScale}
                className={cn(
                  "group flex flex-col bg-card-cream rounded-xl overflow-hidden shadow-sm border-2 transition-all duration-300",
                  isInCart(item.id)
                    ? "border-primary shadow-primary/20"
                    : "border-border hover:border-[var(--border-hover)] hover:shadow-xl"
                )}
              >
                <div className="relative h-64 overflow-hidden bg-muted flex items-center justify-center">
                  <span className="text-8xl transition-transform duration-500 group-hover:scale-110">
                    {item.image}
                  </span>
                  {item.badge && (
                    <div
                      className={cn(
                        "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm transition-transform duration-200 group-hover:scale-105",
                        item.badgeType === "new"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card/90 backdrop-blur"
                      )}
                    >
                      {item.badge}
                    </div>
                  )}
                  {isInCart(item.id) && (
                    <div className="absolute top-4 left-4 size-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold transition-colors duration-200 group-hover:text-primary">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-primary">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-sm text-foreground-muted line-clamp-2">
                    {item.description}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    disabled={addingToCart === item.id}
                    className={cn(
                      "mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all duration-200",
                      isInCart(item.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary group-hover:border-primary active:scale-[0.98]",
                      addingToCart === item.id && "scale-95 opacity-70"
                    )}
                  >
                    {isInCart(item.id) ? (
                      <>
                        <Check className="h-4 w-4" />
                        Agregado
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Agregar al Pedido
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Cart Button */}
        {cartCount > 0 && (
          <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none">
            <motion.button
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="pointer-events-auto flex items-center gap-4 bg-foreground text-background px-8 py-5 rounded-full shadow-2xl shadow-foreground/40 border border-border/10 group transition-all duration-200 hover:scale-105 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/30"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 size-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-black text-primary-foreground animate-pulse">
                    {cartCount}
                  </span>
                </div>
                <div className="flex flex-col border-l border-border/20 pl-4">
                  <span className="text-xs text-muted uppercase font-bold tracking-widest">
                    Ver pedido
                  </span>
                  <span className="text-lg font-bold">{cartTotal}</span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </div>
        )}
      </main>
    </div>
  );
}
