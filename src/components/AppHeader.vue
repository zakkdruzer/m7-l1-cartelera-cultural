<template>
  <header class="header">
    <div>
      <h1>Cartelera Cultural</h1>
      <p>Panel interno de gestión</p>
    </div>

    <div class="header-actions">
      <nav class="nav">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/acerca">Acerca</RouterLink>
      </nav>

      <button
        class="theme-toggle"
        type="button"
        @click="toggleTheme"
      >
        {{ theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro' }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: var(--header-bg);
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 600;
}

.nav a.router-link-exact-active {
  text-decoration: underline;
}

.theme-toggle {
  min-width: 44px;
  min-height: 44px;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  background: var(--button-bg);
  color: var(--button-text);
  cursor: pointer;
}
</style>