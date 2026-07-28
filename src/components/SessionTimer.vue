<template>
  <section class="timer-box">
    <h3>Sesión activa</h3>
    <p>{{ seconds }} segundos</p>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const seconds = ref(0)
let intervalId = null

onMounted(() => {
  // Se inicia el temporizador cuando el componente aparece.
  intervalId = setInterval(() => {
    seconds.value++
  }, 1000)
})

onUnmounted(() => {
  // Limpieza obligatoria para evitar fugas de memoria.
  clearInterval(intervalId)
})
</script>

<style scoped>
.timer-box {
  padding: 1rem;
  border-radius: 12px;
  background: var(--surface-soft);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}
</style>