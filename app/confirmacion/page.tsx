"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Coffee,
  Bell,
  User,
  Receipt,
  CreditCard,
  MapPin,
  Printer,
  Home,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, fadeInScale } from "@/lib/animations";

const orderItems = [
  {
    name: "Latte con Leche de Avena",
    details: "Muy Caliente, Caramelo",
    price: "$6.50",
  },
  {
    name: "Croissant de Almendras",
    details: "Caliente, Extra Hojaldrado",
    price: "$4.75",
  },
  {
    name: "Tostada de Aguacate y Masa Madre",
    details: "Con Huevo Poché",
    price: "$12.00",
  },
];

export default function ConfirmacionPage() {
  return (
    <div className="min-h-screen bg-background font-display">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-primary/10 px-6 py-4 md:px-20 lg:px-40">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-8 text-primary">
            <Coffee className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-primary">
            Maloca
          </h2>
        </Link>
        <div className="flex gap-3">
          <button className="flex items-center justify-center rounded-xl h-11 w-11 bg-primary/10 text-primary">
            <Bell className="h-5 w-5" />
          </button>
          <button className="flex items-center justify-center rounded-xl h-11 w-11 bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 md:px-20 lg:px-40 max-w-[1200px] mx-auto w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Success Header */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center mb-10 text-center"
          >
            <motion.div
              variants={fadeInScale}
              className="mb-6 relative flex flex-col items-center justify-center"
            >
              {/* Steam Animation */}
              <div className="absolute -top-10 flex gap-1">
                <span className="text-primary/40 animate-pulse">〰️</span>
                <span className="text-primary/60 animate-pulse delay-150">
                  〰️
                </span>
                <span className="text-primary/40 animate-pulse delay-300">
                  〰️
                </span>
              </div>
              <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg mb-4">
                <Coffee className="h-12 w-12" />
              </div>
            </motion.div>
            <h1 className="tracking-tight text-4xl md:text-5xl font-extrabold leading-tight mb-3">
              ¡Gracias por tu compra!
            </h1>
            <p className="text-foreground-muted text-lg font-medium max-w-lg">
              El pedido #ML-4829 está siendo preparado por nuestros baristas y
              estará listo para recoger pronto.
            </p>
          </motion.div>

          {/* Order Details Grid */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mb-12"
          >
            {/* Order Summary */}
            <div className="md:col-span-7 bg-card-cream p-8 rounded-xl shadow-sm border border-primary/5">
              <div className="flex items-center gap-2 mb-6">
                <Receipt className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-primary uppercase tracking-wider text-sm">
                  Resumen de tu Pedido
                </h2>
              </div>
              <div className="space-y-6">
                {orderItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-start"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-lg">{item.name}</span>
                      <span className="text-sm text-foreground-muted">
                        {item.details}
                      </span>
                    </div>
                    <span className="font-bold">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-primary/10 space-y-3">
                <div className="flex justify-between text-foreground-muted font-medium">
                  <span>Subtotal</span>
                  <span>$23.25</span>
                </div>
                <div className="flex justify-between text-foreground-muted font-medium">
                  <span>Impuestos (8.5%)</span>
                  <span>$1.98</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {/* Total */}
              <div className="bg-primary p-8 rounded-xl shadow-sm border border-primary/5 flex flex-col justify-center items-center text-center text-primary-foreground">
                <p className="text-primary-foreground/80 uppercase tracking-widest text-xs font-bold mb-2">
                  Total Pagado
                </p>
                <h3 className="text-5xl font-extrabold">$25.23</h3>
              </div>

              {/* Payment Method */}
              <div className="bg-card-cream p-6 rounded-xl shadow-sm border border-primary/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">
                      Método de Pago
                    </p>
                    <p className="font-bold text-lg">Mastercard •••• 4412</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-2 px-3 bg-success/10 text-success rounded-lg text-sm font-bold w-fit">
                  <CheckCircle className="h-4 w-4" />
                  Transacción Exitosa
                </div>
              </div>

              {/* Pickup Location */}
              <div className="bg-card-cream p-6 rounded-xl shadow-sm border border-primary/5 grow relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">
                        Recoger en
                      </p>
                      <p className="font-bold text-lg">Maloca - Centro</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-muted">
                    Listo en 8-12 minutos
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center"
          >
            <Button size="lg" className="gap-2 min-w-[200px]">
              <Printer className="h-5 w-5" />
              Imprimir Recibo
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="gap-2 min-w-[200px]"
            >
              <Link href="/">
                <Home className="h-5 w-5" />
                Volver al Inicio
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 text-center text-foreground-muted text-sm font-medium">
        <p>© 2024 Maloca Gestión de Cafetería. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
