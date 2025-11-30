# Guía de Despliegue - CoolCloset 🚀

## Variables de Entorno Necesarias

Crea un archivo `.env` (local) o configura estas variables en tu plataforma de despliegue:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# NextAuth (Autenticación)
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://tu-dominio.vercel.app"

# Cloudinary (Almacenamiento de Imágenes)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

---

## Pasos para Desplegar en Vercel

### 1. Preparar Base de Datos PostgreSQL en la Nube

Recomendaciones (planes gratuitos disponibles):

- **Neon** (https://neon.tech) - 0.5 GB gratis
- **Supabase** (https://supabase.com) - 500 MB gratis
- **Vercel Postgres** - Incluido en el plan de Vercel

### 2. Generar NEXTAUTH_SECRET

Ejecuta en tu terminal:

```bash
openssl rand -base64 32
```

O usa: https://generate-secret.vercel.app/32

### 3. Desplegar en Vercel

1. Crea una cuenta en https://vercel.com
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno en Vercel Dashboard
4. Vercel detectará automáticamente que es un proyecto Next.js
5. Click en **Deploy**

### 4. Ejecutar Migraciones de Prisma

Después del primer deploy, ejecuta en tu terminal local:

```bash
# Con tu DATABASE_URL de producción en .env
npx prisma migrate deploy
npx prisma db seed
```

O configura el comando de build en Vercel:

```
prisma migrate deploy && prisma db seed && next build
```

---

## Configuración de Cloudinary

1. Ve a https://cloudinary.com/console
2. Copia:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Crea un **Upload Preset**:
   - Nombre: `coolcloset-products`
   - Signing Mode: `Unsigned`
   - Folder: `coolcloset/products`

---

## Comandos Útiles

```bash
# Build local
npm run build

# Generar cliente de Prisma
npx prisma generate

# Ver base de datos
npx prisma studio

# Ejecutar migraciones
npx prisma migrate deploy

# Poblar base de datos
npx prisma db seed
```

---

## Checklist Pre-Despliegue

- [ ] Build local exitoso (`npm run build`)
- [ ] Base de datos PostgreSQL creada
- [ ] Variables de entorno configuradas en Vercel
- [ ] Upload Preset de Cloudinary creado
- [ ] Repositorio subido a GitHub
- [ ] Migraciones de Prisma ejecutadas en producción
- [ ] Datos de prueba cargados (seed)

---

## Estructura del Proyecto

```
coolcloset/
├── prisma/
│   ├── schema.prisma          # Esquema de base de datos
│   └── migrations/            # Migraciones
├── src/
│   ├── actions/               # Server Actions
│   ├── app/                   # Pages (App Router)
│   ├── components/            # Componentes React
│   ├── store/                 # Zustand stores
│   └── utils/                 # Utilidades
├── public/                    # Archivos estáticos
└── .env                       # Variables de entorno (local)
```

---

## Soporte

Para más información sobre Next.js: https://nextjs.org/docs
Para más información sobre Prisma: https://www.prisma.io/docs
Para más información sobre Vercel: https://vercel.com/docs
