# 🛍️ CoolCloset - E-Commerce Platform

> Una plataforma de e-commerce moderna y completa construida con las últimas tecnologías web.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.10-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

---

## ✨ Características Principales

### 🛒 **Para Clientes**

- 🔐 **Autenticación Segura** con NextAuth v5
- 🛍️ **Catálogo de Productos** con filtrado por categorías y géneros
- 🔍 **Búsqueda Avanzada** de productos
- 🛒 **Carrito de Compras** persistente con Zustand
- 📦 **Gestión de Órdenes** con historial completo
- 📱 **Diseño Responsivo** optimizado para todos los dispositivos
- 🎨 **Interfaz Moderna** con animaciones suaves

### 👨‍💼 **Panel de Administración**

- 📊 **Dashboard Completo** con estadísticas en tiempo real
- 📦 **Gestión de Productos** (CRUD completo)
- 🖼️ **Subida de Imágenes** a Cloudinary
- 👥 **Gestión de Usuarios** y roles
- 📋 **Gestión de Órdenes** con estados
- 🏷️ **Gestión de Categorías**
- 🔒 **Protección de Rutas** basada en roles

---

## 🚀 Stack Tecnológico

### **Frontend**

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 4
- **Estado Global:** Zustand
- **Formularios:** React Hook Form
- **Validación:** Zod
- **Carrusel:** Swiper

### **Backend**

- **Runtime:** Node.js
- **Framework:** Next.js (Server Actions)
- **ORM:** Prisma
- **Base de Datos:** PostgreSQL
- **Autenticación:** NextAuth v5
- **Encriptación:** bcryptjs

### **Servicios en la Nube**

- **Hosting:** Vercel
- **Base de Datos:** Neon (PostgreSQL)
- **Almacenamiento de Imágenes:** Cloudinary

### **Herramientas de Desarrollo**

- **Linting:** ESLint
- **Formato:** Prettier
- **Control de Versiones:** Git & GitHub

---

## 📁 Estructura del Proyecto

```
coolcloset/
├── prisma/
│   ├── schema.prisma          # Esquema de base de datos
│   ├── migrations/            # Migraciones de Prisma
│   └── seed/                  # Datos de prueba
├── public/
│   └── products/              # Imágenes de productos (local)
├── src/
│   ├── actions/               # Server Actions
│   │   ├── admin/            # Acciones de administración
│   │   ├── auth/             # Autenticación
│   │   ├── products/         # Productos
│   │   └── payments/         # Pagos
│   ├── app/                   # Pages (App Router)
│   │   ├── (shop)/           # Rutas públicas
│   │   ├── admin/            # Panel de administración
│   │   └── api/              # API Routes
│   ├── components/            # Componentes React
│   │   ├── products/         # Componentes de productos
│   │   ├── ui/               # Componentes UI reutilizables
│   │   └── admin/            # Componentes del admin
│   ├── config/               # Configuración
│   ├── store/                # Zustand stores
│   │   ├── cart/             # Carrito de compras
│   │   ├── address/          # Direcciones
│   │   └── ui/               # Estado de UI
│   └── utils/                # Utilidades
├── .env                       # Variables de entorno
├── next.config.ts            # Configuración de Next.js
├── tailwind.config.ts        # Configuración de Tailwind
└── tsconfig.json             # Configuración de TypeScript
```

---

## 🗄️ Modelo de Datos

```prisma
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Product   │────→│ ProductImage │     │  Category   │
├─────────────┤     ├──────────────┤     ├─────────────┤
│ id          │     │ id           │     │ id          │
│ title       │     │ url          │     │ name        │
│ description │     │ productId    │     └─────────────┘
│ price       │     └──────────────┘            ↑
│ inStock     │                                 │
│ sizes       │                                 │
│ tags        │─────────────────────────────────┘
│ gender      │
│ categoryId  │
└─────────────┘

┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│    User     │────→│    Order     │────→│  OrderItem  │
├─────────────┤     ├──────────────┤     ├─────────────┤
│ id          │     │ id           │     │ id          │
│ name        │     │ userId       │     │ productId   │
│ email       │     │ total        │     │ quantity    │
│ password    │     │ isPaid       │     │ price       │
│ role        │     │ createdAt    │     │ size        │
└─────────────┘     └──────────────┘     └─────────────┘
```

---

## 🔧 Instalación y Configuración

### **Requisitos Previos**

- Node.js 18+
- PostgreSQL (Docker o Neon)
- Cuenta de Cloudinary

### **1. Clonar el Repositorio**

```bash
git clone https://github.com/jocesman/coolcloset.git
cd coolcloset
```

### **2. Instalar Dependencias**

```bash
npm install
```

### **3. Configurar Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### **4. Configurar Base de Datos**

```bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# Poblar base de datos con datos de prueba
npx prisma db seed
```

### **5. Iniciar Servidor de Desarrollo**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 👤 Usuarios de Prueba

Después de ejecutar el seed, puedes usar estas credenciales:

### **Usuario Administrador**

- **Email:** `admin@coolcloset.com`
- **Contraseña:** `Admin123`

### **Usuario Regular**

- **Email:** `user@coolcloset.com`
- **Contraseña:** `User123`

---

## 📝 Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Iniciar servidor de producción
npm run lint       # Ejecutar linter
npm run format     # Formatear código con Prettier
```

---

## 🚀 Despliegue en Vercel

### **Paso 1: Preparar Base de Datos**

1. Crea una base de datos PostgreSQL en [Neon](https://neon.tech)
2. Copia el connection string

### **Paso 2: Crear Upload Preset en Cloudinary**

1. Ve a [Cloudinary Console](https://console.cloudinary.com)
2. Settings → Upload → Upload presets
3. Crea preset: `coolcloset-products` (Unsigned)

### **Paso 3: Desplegar en Vercel**

1. Conecta tu repositorio en [Vercel](https://vercel.com)
2. Configura las variables de entorno
3. Deploy

### **Paso 4: Ejecutar Migraciones**

```bash
DATABASE_URL="tu-url-de-produccion" npx prisma migrate deploy
DATABASE_URL="tu-url-de-produccion" npx prisma db seed
```

---

## 🔐 Seguridad

- ✅ Autenticación con NextAuth v5
- ✅ Protección de rutas con Middleware
- ✅ Validación de roles (admin/user)
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Sanitización de inputs con Zod
- ✅ Server Actions protegidas
- ✅ Variables de entorno seguras

---

## 📸 Capturas de Pantalla

### 🏠 Página Principal

```markdown
![Home](./screenshots/home.png)
![Product](./screenshots/product.png)
![Cart](./screenshots/cart.png)
![Admin Dashboard](./screenshots/admin.png)
```

---

## 🎯 Roadmap

### **Próximas Características**

- [ ] Integración de pasarelas de pago (Stripe/PayPal)
- [ ] Sistema de reseñas y calificaciones
- [ ] Wishlist de productos
- [ ] Notificaciones por email
- [ ] Sistema de cupones y descuentos
- [ ] Chat de soporte en vivo
- [ ] Análisis avanzado en el dashboard
- [ ] Multi-moneda y multi-idioma

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**José Céspedes**

- GitHub: [@jocesman](https://github.com/jocesman)
- LinkedIn: [Tu LinkedIn](https://linkedin.com/in/ing-jose-cespedes)
- Portfolio: [Tu Portfolio](https://tu-portfolio.com)

---

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework de React
- [Vercel](https://vercel.com/) - Hosting y deployment
- [Prisma](https://www.prisma.io/) - ORM moderno
- [Cloudinary](https://cloudinary.com/) - Gestión de imágenes
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS

---

<div align="center">
  <p>⭐ Si te gustó este proyecto, dale una estrella en GitHub</p>
  <p>Made with ❤️ by <a href="https://github.com/jocesman">José Céspedes</a></p>
</div>
