# Terrainnova Frontend

Proyecto de e-commerce sostenible: Terrainnova

## Descripción
Frontend moderno para la plataforma Terrainnova, construido con React, Vite y TypeScript. Incluye catálogo de productos, carrito, autenticación, panel de administración, chat inteligente y más. Optimizado para SEO, accesibilidad y rendimiento.

---

## Requisitos previos
- Node.js >= 16.x
- npm >= 8.x (o yarn)

---

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone <URL-del-repo>
   cd terrainnova-front
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```

---

## Variables de entorno

Crea un archivo `.env` en la raíz con al menos la siguiente variable:

```
VITE_API_URL=http://localhost:3000
```

Ajusta la URL según tu backend.

---

## Scripts principales

- **Desarrollo:**
  ```bash
  npm run dev
  # o
  yarn dev
  ```
  Accede a [http://localhost:5173](http://localhost:5173)

- **Build producción:**
  ```bash
  npm run build
  # o
  yarn build
  ```

- **Vista previa del build:**
  ```bash
  npm run preview
  # o
  yarn preview
  ```

---

## Estructura principal

- `src/` Código fuente principal
- `public/` Archivos estáticos (favicon, robots.txt, sitemap.xml)
- `src/features/` Módulos por dominio (productos, carrito, admin, etc.)
- `src/shared/` Componentes y utilidades reutilizables

---

## Notas importantes
- Las imágenes están optimizadas en formato `.webp`.
- El chat soporta Markdown y muestra imágenes de productos.
- El panel de administración y rutas protegidas requieren autenticación.
- Para el correcto funcionamiento, asegúrate de tener el backend corriendo y sirviendo imágenes estáticas.

---

## Accesibilidad y SEO
- Headings jerárquicos y `alt` descriptivos en imágenes.
- `robots.txt` y `sitemap.xml` configurados para buscadores.
- Datos estructurados JSON-LD incluidos.

---

## Contacto
¿Dudas o sugerencias? Escribe a [tu-email@ejemplo.com]
