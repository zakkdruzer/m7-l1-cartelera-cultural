<template>
  <BasePanel>
    <template #header>
      <div>
        <h3>Resumen del mes</h3>
        <p>Vista resumida de la cartelera actual.</p>
      </div>
    </template>

    <ul class="summary-list">
      <li>Total de eventos: {{ totalEvents }}</li>
      <li>Total de favoritos: {{ totalFavorites }}</li>
      <li>Total de cupos reservados: {{ totalReservedSeats }}</li>
      <li>Eventos agotados: {{ soldOutEvents }}</li>
      <li>Eventos gratuitos: {{ freeEvents }}</li>
    </ul>
  </BasePanel>
</template>

<script setup>
import { computed } from 'vue'
import BasePanel from '../BasePanel.vue'

const props = defineProps({
  events: {
    type: Array,
    required: true
  }
})

const totalEvents = computed(() => props.events.length)

const totalFavorites = computed(() =>
  props.events.filter((event) => event.favorito).length
)

const totalReservedSeats = computed(() =>
  props.events.reduce((acc, event) => acc + event.cuposReservados, 0)
)

const soldOutEvents = computed(() =>
  props.events.filter((event) => event.cuposReservados >= event.cuposTotales).length
)

const freeEvents = computed(() =>
  props.events.filter((event) => event.precio === 0).length
)
</script>

<style scoped>
.summary-list {
  display: grid;
  gap: 0.75rem;
  padding-left: 1rem;
}
</style>