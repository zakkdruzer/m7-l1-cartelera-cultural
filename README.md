# Cartelera Cultural

Aplicación desarrollada con Vue 3, Vite y Vue Router para gestionar una cartelera de eventos culturales. Permite visualizar eventos, reservar cupos, marcar favoritos, buscar por título y manejar estados de carga y ciclo de vida de componentes.

## Características

- Visualización de eventos culturales en tarjetas.
- Reserva de cupos por evento.
- Marcado y desmarcado de favoritos.
- Cálculo de cupos disponibles y porcentaje de ocupación.
- Barra de progreso por evento.
- Carga asíncrona simulada.
- Contador de sesión con limpieza de intervalo al desmontar el componente.
- Buscador por título en tiempo real.
- Estado vacío con opción para limpiar búsqueda.
- Navegación con Vue Router.
- Preparado para desplegar en GitHub Pages con hash routing.

## Tecnologías

- Vue 3
- Vite
- Vue Router
- JavaScript
- CSS

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
│  ├─ AppHeader.vue
│  ├─ EmptyState.vue
│  ├─ EventCard.vue
│  ├─ EventList.vue
│  ├─ LoadingState.vue
│  ├─ SearchBar.vue
│  └─ SessionTimer.vue
├─ data/
│  └─ events.js
├─ router/
│  └─ index.js
├─ views/
│  ├─ AboutView.vue
│  └─ HomeView.vue
├─ App.vue
└─ main.js
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

### Reserva de cupos

Cada tarjeta permite reservar un cupo, siempre que el evento no esté agotado.  
Cuando un evento llega a su capacidad máxima, el botón de reserva se deshabilita automáticamente.

### Favoritos

Los eventos pueden marcarse como favoritos para destacarlos visualmente dentro de la interfaz.

### Búsqueda en tiempo real

Existe un buscador por título que filtra la cartelera mientras el usuario escribe.  
Si no hay coincidencias, se muestra un estado vacío con una acción para limpiar la búsqueda.

### Ciclo de vida

La aplicación simula carga asíncrona de datos al iniciar.  
Además, incluye un contador de sesión que se actualiza cada segundo y se limpia correctamente al desmontar el componente para evitar fugas de memoria.

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

## Puedes ver el resultado en:

https://zakkdruzer.github.io/m7-l1-cartelera-cultural
