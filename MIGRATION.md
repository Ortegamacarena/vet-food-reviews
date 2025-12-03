# Migración de React a Astro - PetFood Expert

## Cambios Realizados

### 1. **Conversión de Framework**
- **De:** React con Vite
- **A:** Astro estático con integración de React para componentes interactivos

### 2. **Cambio de Rutas**
- **Antes:** `/articulo/[slug]`
- **Ahora:** `/analisis/[slug]`
- Todos los enlaces internos han sido actualizados

### 3. **Estructura del Proyecto**

```
src/
├── layouts/
│   └── Layout.astro          # Layout principal
├── pages/
│   ├── index.astro           # Home
│   ├── articulos.astro       # Lista de reviews
│   ├── analisis/
│   │   └── [slug].astro      # Detalle de review
│   ├── marcas.astro          # Lista de marcas
│   ├── marca/
│   │   └── [id].astro        # Detalle de marca
│   ├── razas.astro           # Lista de razas
│   ├── raza/
│   │   └── [type]/
│   │       └── [id].astro    # Detalle de raza
│   └── autor.astro           # Página del autor
├── components/
│   ├── layout/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   └── home/
│       ├── HeroSection.astro
│       ├── FeaturedReviews.astro
│       ├── BrandsShowcase.astro
│       ├── BreedsPreview.astro
│       └── AboutAuthor.astro
├── styles/
│   └── globals.css
├── data/                     # JSON data files (sin cambios)
└── lib/
    └── utils.ts
```

### 4. **Archivos de Configuración**

#### package-astro.json
Nuevo archivo con dependencias de Astro. Para instalar:
```bash
mv package-astro.json package.json
npm install
```

#### astro.config.mjs
Configuración de Astro con integraciones de Tailwind y React.

#### tsconfig-astro.json
TypeScript config para Astro. Para usar:
```bash
mv tsconfig-astro.json tsconfig.json
```

### 5. **Componentes**

- **Astro Components (.astro):** Para contenido estático
- **React Components:** Disponibles si se necesitan para interactividad
- Todos los estilos mantienen las mismas clases de Tailwind

### 6. **Datos**
Los archivos JSON en `src/data/` permanecen sin cambios:
- `articles.json`
- `brands.json`
- `breeds.json`
- `author.json`

### 7. **Estilos**
El archivo `globals.css` mantiene todos los estilos personalizados, variables CSS y animaciones.

## Instrucciones de Uso

### Instalación
```bash
# Reemplazar package.json
mv package-astro.json package.json

# Reemplazar tsconfig.json
mv tsconfig-astro.json tsconfig.json

# Instalar dependencias
npm install
```

### Desarrollo
```bash
npm run dev
```
La app estará disponible en `http://localhost:4321`

### Build
```bash
npm run build
```
Los archivos estáticos se generarán en `dist/`

### Preview
```bash
npm run preview
```

## Ventajas de la Migración

1. **Mejor Performance:** Sitio estático, carga más rápida
2. **SEO Mejorado:** HTML pre-renderizado
3. **Menor JavaScript:** Solo JS necesario en el cliente
4. **Hosting Simple:** Se puede hospedar en cualquier servidor estático
5. **Build Time:** Genera todas las páginas en build time

## Compatibilidad

- Todas las funcionalidades se mantienen
- Mismo diseño y estilos
- URLs amigables para SEO
- Misma estructura de datos
