<template>
  <div class="empty-state">
    <h3>No encontramos eventos con ese título</h3>
    <p>Prueba con otra palabra o limpia el buscador para volver a ver toda la cartelera.</p>
    <button type="button" @click="$emit('clear')">
      Limpiar búsqueda
    </button>
  </div>
</template>

<script setup>
defineEmits(['clear'])
</script>

<style scoped>
.empty-state {
  display: grid;
  gap: 0.75rem;
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
  background: #f8fafc;
}

button {
  min-width: 44px;
  min-height: 44px;
  margin-inline: auto;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10px;
  background: #0f172a;
  color: white;
  cursor: pointer;
}
</style>