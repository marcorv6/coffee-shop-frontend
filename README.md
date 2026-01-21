# Maloca - Coffee Shop Management System

Sistema integral de gestión para cafeterías, construido con Next.js 15, React 19, TypeScript y Tailwind CSS v4.

## Características

- 🏠 **Panel de Administración** - Dashboard con estadísticas, gráficos de ventas, alertas de inventario
- 📊 **Gestión de Ventas** - Historial de transacciones, reportes y contabilidad
- 📦 **Control de Inventario** - Stock, proveedores, alertas de reabastecimiento
- 👥 **Gestión de Personal** - Horarios, asistencia, reloj de tiempo
- 📱 **Menú Digital** - Interfaz para clientes con categorías y carrito
- ✅ **Confirmación de Pago** - Página de confirmación de pedidos

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 con colores OKLCH
- **UI Components**: shadcn/ui (new-york style)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Deployment**: Firebase Hosting (static export)

## Estructura del Proyecto

```
app/
├── layout.tsx              # Layout raíz con fuentes y metadata
├── page.tsx                # Página principal con navegación
├── globals.css             # Tokens de diseño y Tailwind
├── admin/
│   ├── layout.tsx          # Layout admin con sidebar
│   ├── page.tsx            # Dashboard principal
│   ├── ventas/page.tsx     # Historial de ventas
│   ├── inventario/page.tsx # Gestión de inventario
│   └── personal/page.tsx   # Gestión de personal
├── menu/
│   ├── layout.tsx          # Layout del menú digital
│   └── page.tsx            # Menú para clientes
└── confirmacion/
    └── page.tsx            # Confirmación de pago

components/
├── ui/                     # Componentes shadcn/ui
│   ├── button.tsx
│   ├── sheet.tsx
│   ├── stat-card.tsx
│   ├── sales-chart.tsx
│   ├── inventory-alert.tsx
│   ├── transaction-table.tsx
│   └── staff-card.tsx
└── layout/
    ├── admin-sidebar.tsx   # Sidebar de navegación admin
    └── admin-header.tsx    # Header del panel admin

lib/
├── utils.ts               # Utilidad cn()
├── animations.ts          # Variantes de Framer Motion
└── form-utils.ts          # Helpers para formularios
```

## Rutas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con navegación |
| `/admin` | Panel de administración (Dashboard) |
| `/admin/ventas` | Historial de ventas y contabilidad |
| `/admin/inventario` | Gestión de inventario |
| `/admin/personal` | Gestión de personal y horarios |
| `/menu` | Menú digital para clientes |
| `/confirmacion` | Página de confirmación de pago |

## Inicio Rápido

### Prerequisitos

- Node.js 18+
- npm, yarn, o pnpm

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Deploy en Firebase

El proyecto está configurado para exportación estática compatible con Firebase Hosting:

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login a Firebase
firebase login

# Construir
npm run build

# Desplegar
firebase deploy --only hosting
```

**Nota**: Actualizar el proyecto ID en `.firebaserc` antes del despliegue.

## Sistema de Diseño

Paleta de colores usando OKLCH para mejor consistencia:

- `--primary`: Color principal (marrón café)
- `--background`: Fondo claro crema
- `--foreground`: Texto principal oscuro
- `--card`: Fondo de tarjetas
- `--success`: Acciones exitosas (verde)
- `--warning`: Alertas (ámbar)
- `--destructive`: Errores (rojo)

## Animaciones

Variantes predefinidas en `lib/animations.ts`:

- `fadeInUp`: Fade con movimiento hacia arriba
- `fadeInScale`: Fade con efecto de escala
- `staggerContainer`: Contenedor para animar hijos secuencialmente

## Licencia

Proyecto privado - Todos los derechos reservados
