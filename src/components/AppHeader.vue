<template>
  <header class="header">
    <div>
      <h1>Cartelera Cultural</h1>
      <p>Panel interno de gestión</p>
    </div>

    <nav class="nav">
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/acerca">Acerca</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #1f2937;
  color: white;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

.nav a.router-link-exact-active {
  text-decoration: underline;
}
</style>