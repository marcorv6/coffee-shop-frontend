"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Coffee, ArrowRight, LayoutDashboard, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, fadeInScale, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Panel de Administración",
    description:
      "Gestiona ventas, inventario y personal desde un dashboard centralizado.",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Menú Digital",
    description:
      "Interfaz moderna para que los clientes exploren y ordenen fácilmente.",
    href: "/menu",
    icon: Menu,
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container relative z-10 mx-auto text-center"
        >
          <motion.div variants={fadeInScale} className="mb-6 inline-block">
            <Link
              href="/admin"
              className="group block w-20 h-20 mx-auto bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95"
            >
              <Coffee className="h-10 w-10 transition-transform duration-300 group-hover:rotate-12" />
            </Link>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-6 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Bienvenido a
            <br />
            <span className="text-primary">Maloca</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-8 max-w-2xl text-lg text-foreground-muted sm:text-xl"
          >
            Sistema integral de gestión para tu cafetería. Administra ventas,
            inventario, personal y ofrece una experiencia digital única a tus
            clientes.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" asChild className="group">
              <Link href="/admin">
                Ir al Panel Admin
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/menu">Ver Menú Digital</Link>
            </Button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={fadeInUp}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className={cn(
                  "group p-8 bg-card rounded-2xl border-2 border-border shadow-sm text-left",
                  "transition-all duration-300",
                  "hover:shadow-xl hover:border-primary/30 hover:-translate-y-1",
                  "active:translate-y-0 active:shadow-md active:scale-[0.99]",
                  "focus:outline-none focus:ring-4 focus:ring-primary/20"
                )}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-3">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 transition-colors duration-200 group-hover:text-primary">
                  {feature.title}
                </h3>
                <p className="text-foreground-muted text-sm">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-primary font-bold text-sm opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                  Explorar
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
    </div>
  );
}
