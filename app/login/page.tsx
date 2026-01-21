"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Coffee, Mail, Lock, Eye, EyeOff, Shield, HelpCircle, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { fadeInUp, fadeInScale, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { signIn, resetPassword } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Ingresa un correo válido";
    }
    
    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    const { user, error } = await signIn(email, password);
    
    setIsLoading(false);
    
    if (error) {
      setErrors({ general: error });
      return;
    }
    
    if (user) {
      router.push("/admin");
    }
  };

  const handleForgotPassword = async () => {
    setSuccessMessage(null);
    setErrors({});
    
    if (!email) {
      setErrors({ email: "Ingresa tu correo para recuperar la contraseña" });
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: "Ingresa un correo válido" });
      return;
    }
    
    setIsResettingPassword(true);
    
    const { error } = await resetPassword(email);
    
    setIsResettingPassword(false);
    
    if (error) {
      setErrors({ general: error });
      return;
    }
    
    setSuccessMessage("Se envió un correo para restablecer tu contraseña");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Ambient decoration */}
      <div 
        className="fixed bottom-0 left-0 w-full h-[30vh] pointer-events-none opacity-40 z-0"
        style={{ background: "radial-gradient(circle at bottom, oklch(0.55 0.08 50 / 0.15) 0%, transparent 70%)" }}
      />
      
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-bl from-primary/20 to-transparent" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-20 py-6 relative z-10">
        <Link 
          href="/"
          className="flex items-center gap-3 text-foreground group transition-opacity hover:opacity-80"
        >
          <div className="size-8 text-primary transition-transform duration-200 group-hover:scale-110">
            <Coffee className="w-full h-full" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Maloca</h2>
        </Link>
        <button className="flex items-center justify-center gap-2 rounded-xl h-10 px-4 bg-primary/10 text-primary text-sm font-semibold transition-all duration-200 hover:bg-primary/20 active:scale-95">
          <HelpCircle className="h-4 w-4" />
          <span>Centro de Ayuda</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[440px]"
        >
          <motion.div 
            variants={fadeInScale}
            className="bg-card rounded-2xl shadow-xl p-8 md:p-12 border-2 border-border"
          >
            {/* Card Header */}
            <div className="text-center mb-10">
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-6 transition-transform duration-300 hover:scale-110"
              >
                <Coffee className="text-primary h-8 w-8" />
              </motion.div>
              <motion.h1 
                variants={fadeInUp}
                className="text-foreground text-3xl font-bold tracking-tight mb-2"
              >
                Bienvenido de nuevo
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-foreground-muted text-sm"
              >
                Ingresa tus credenciales para acceder al sistema Maloca
              </motion.p>
            </div>

            {/* General Error Message */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm font-medium">{errors.general}</p>
              </motion.div>
            )}

            {/* Success Message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/20 text-success"
              >
                <CheckCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm font-medium">{successMessage}</p>
              </motion.div>
            )}

            {/* Form */}
            <motion.form 
              variants={fadeInUp}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-foreground text-sm font-semibold px-1">
                  Correo electrónico
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "flex w-full rounded-xl text-foreground bg-card border-2 h-14 placeholder:text-foreground-muted p-4 pr-12 text-base font-normal transition-all duration-200",
                      "focus:outline-none focus:ring-4 focus:ring-primary/10",
                      focusedField === "email" || email
                        ? "border-primary"
                        : "border-border hover:border-[var(--border-hover)]",
                      errors.email && "border-destructive focus:ring-destructive/10"
                    )}
                    placeholder="nombre@cafeteria.com"
                  />
                  <Mail 
                    className={cn(
                      "absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200",
                      focusedField === "email" ? "text-primary" : "text-foreground-muted"
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-xs font-medium px-1 animate-in slide-in-from-top-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-foreground text-sm font-semibold">
                    Contraseña
                  </label>
                  <button 
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isResettingPassword}
                    className="text-xs font-semibold text-primary transition-all duration-200 hover:text-[var(--primary-hover)] hover:underline underline-offset-2 disabled:opacity-50"
                  >
                    {isResettingPassword ? "Enviando..." : "¿Olvidaste tu contraseña?"}
                  </button>
                </div>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "flex w-full rounded-xl text-foreground bg-card border-2 h-14 placeholder:text-foreground-muted p-4 pr-12 text-base font-normal transition-all duration-200",
                      "focus:outline-none focus:ring-4 focus:ring-primary/10",
                      focusedField === "password" || password
                        ? "border-primary"
                        : "border-border hover:border-[var(--border-hover)]",
                      errors.password && "border-destructive focus:ring-destructive/10"
                    )}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={cn(
                      "absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-all duration-200 hover:scale-110",
                      focusedField === "password" ? "text-primary" : "text-foreground-muted hover:text-primary"
                    )}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-xs font-medium px-1 animate-in slide-in-from-top-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full flex h-14 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary text-primary-foreground text-base font-bold tracking-tight transition-all duration-200",
                    "hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-primary/30",
                    "active:scale-[0.98] active:bg-[var(--primary-active)]",
                    "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Iniciando sesión...</span>
                    </>
                  ) : (
                    <span>Iniciar sesión</span>
                  )}
                </button>
              </div>
            </motion.form>

            {/* Additional Info */}
            <motion.div 
              variants={fadeInUp}
              className="mt-10 pt-8 border-t border-border flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-2 text-foreground-muted text-xs">
                <Shield className="h-4 w-4" />
                <span>Conexión segura cifrada de 256 bits</span>
              </div>
              <div className="text-foreground-muted text-[10px] uppercase tracking-widest font-bold">
                Maloca v2.4.0 • Sistema de Gestión
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
