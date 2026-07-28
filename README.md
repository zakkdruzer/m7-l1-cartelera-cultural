# Cartelera Cultural

Aplicación desarrollada con Vue 3, Vite y Vue Router para gestionar una cartelera de eventos culturales. Permite visualizar eventos, reservar y liberar cupos, marcar favoritos, filtrar y ordenar resultados, crear nuevos eventos desde la interfaz y trabajar con persistencia de datos, componentes dinámicos, slots y modo oscuro.

## Características

- Visualización de eventos culturales en tarjetas reutilizables.
- Reserva y liberación de cupos por evento.
- Marcado y desmarcado de favoritos.
- Cancelación de eventos con confirmación previa.
- Cálculo de cupos disponibles y porcentaje de ocupación.
- Barra de progreso por evento.
- Carga asíncrona simulada.
- Contador de sesión con limpieza de intervalo al desmontar el componente.
- Buscador por título en tiempo real.
- Filtro por categoría.
- Filtro de solo eventos disponibles.
- Ordenamiento por precio y disponibilidad.
- Notificaciones temporales para acciones del usuario.
- Estado vacío con opción para limpiar búsqueda.
- Navegación por pestañas con componentes dinámicos.
- Conservación del estado entre pestañas.
- Formulario para crear eventos con validación por campo.
- Persistencia de reservas, favoritos y eventos creados.
- Contenido inyectado mediante slots para personalizar el renderizado de la lista.
- Lógica de negocio extraída a composables reutilizables.
- Modo oscuro con conmutador y preferencia del sistema.
- Navegación con Vue Router.
- Preparado para desplegar en GitHub Pages con hash routing.

## Tecnologías

- Vue 3
- Vite
- Vue Router
- JavaScript
- CSS
- localStorage

## Instalación

Clona el repositorio e instala las dependencias:

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

## Build de producción

```bash
npm run build
```

## Vista previa del build

```bash
npm run preview
```

## Estructura del proyecto

```bash
src/
├─ assets/
├─ components/
│  ├─ tabs/
│  │  ├─ TabCartelera.vue
│  │  ├─ TabCrearEvento.vue
│  │  ├─ TabNotasEquipo.vue
│  │  └─ TabResumenMes.vue
│  ├─ AppHeader.vue
│  ├─ BasePanel.vue
│  ├─ EmptyState.vue
│  ├─ EventCard.vue
│  ├─ EventForm.vue
│  ├─ EventList.vue
│  ├─ LoadingState.vue
│  ├─ NotificationToast.vue
│  ├─ SearchBar.vue
│  ├─ SessionTimer.vue
│  └─ TabsSection.vue
├─ composables/
│  ├─ useEvents.js
│  └─ useTheme.js
├─ data/
│  └─ events.js
├─ router/
│  └─ index.js
├─ views/
│  ├─ AboutView.vue
│  └─ HomeView.vue
├─ App.vue
├─ main.js
└─ style.css
```

## Funcionalidades principales

### Gestión de eventos

Cada evento se representa mediante una tarjeta reutilizable con su información principal:

- Título
- Categoría
- Precio
- Cupos disponibles
- Porcentaje de ocupación
- Estado visual según disponibilidad

Además, los eventos pueden reservarse, liberar cupos, marcarse como favoritos o eliminarse desde la interfaz.

### Filtros y ordenamiento

La aplicación permite:

- Buscar eventos por título.
- Filtrar por categoría.
- Mostrar solo eventos disponibles.
- Ordenar por precio.
- Ordenar por disponibilidad.

Todos estos criterios se combinan sin modificar el arreglo original de eventos.

### Estados derivados

La aplicación calcula dinámicamente:

- Cupos disponibles.
- Porcentaje de ocupación.
- Total de cupos reservados.
- Lista filtrada y ordenada.

Esto evita duplicar estado y mantiene la información consistente en toda la interfaz.

### Ciclo de vida y experiencia de usuario

La aplicación simula carga asíncrona de datos al iniciar.  
También incluye un contador de sesión que se actualiza cada segundo y se limpia correctamente al desmontar el componente para evitar fugas de memoria.

Además, cada acción importante muestra una notificación temporal y, cuando una búsqueda no arroja resultados, se presenta un estado vacío con una acción para limpiar filtros.

### Componentes dinámicos y composición

La interfaz incorpora pestañas dinámicas para navegar entre distintas secciones sin usar el router interno para ese flujo.  
Las pestañas conservan su estado al cambiar de una a otra, incluyendo notas del equipo y el formulario de creación.

También se utiliza un componente contenedor reutilizable y un sistema de slots que permite personalizar desde el padre cómo se renderiza cada elemento de la lista.

### Persistencia y tema

Las reservas, favoritos y eventos creados se guardan en el navegador, por lo que se mantienen incluso después de refrescar la página.

La aplicación también incluye modo oscuro con un botón de conmutación manual y detección de la preferencia del sistema operativo.

## Arquitectura

La lógica principal de gestión de eventos fue extraída a un composable para mantener los componentes visuales más limpios y reutilizables.

### Composables utilizados

- `useEvents.js`: administra eventos, reservas, favoritos, notificaciones, persistencia y creación de nuevos eventos.
- `useTheme.js`: controla el tema activo, el cambio entre modo claro y oscuro y la persistencia de la preferencia visual.

## Router

El proyecto usa Vue Router para la navegación entre vistas.  
Para compatibilidad con GitHub Pages se recomienda usar `createWebHashHistory()`.

Ejemplo:

```js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/acerca',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
```

## Deploy en GitHub Pages

### 1. Configurar Vite

En `vite.config.js`:

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/nombre-del-repo/',
})
```

### 2. Instalar gh-pages

```bash
npm install gh-pages --save-dev
```

### 3. Agregar scripts en package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 4. Ejecutar deploy

```bash
npm run deploy
```

### 5. Configurar Pages en GitHub

En la configuración del repositorio:

- Ir a **Settings**
- Ir a **Pages**
- En **Source**, elegir **Deploy from a branch**
- Seleccionar la rama **gh-pages**
- Seleccionar la carpeta **/**

## Puedes ver el resultado en

https://zakkdruzer.github.io/m7-l1-cartelera-cultural
