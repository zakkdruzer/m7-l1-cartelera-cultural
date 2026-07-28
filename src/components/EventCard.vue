<template>
  <article class="card" :class="statusClass">
    <div class="card__header">
      <div>
        <p class="category">{{ event.categoria }}</p>
        <h3>{{ event.titulo }}</h3>
      </div>

      <button
        class="favorite-btn"
        type="button"
        :aria-pressed="event.favorito"
        @click="emitToggleFavorite"
      >
        {{ event.favorito ? '★ Favorito' : '☆ Favorito' }}
      </button>
    </div>

    <div class="card__body">
      <p><strong>Precio:</strong> {{ formattedPrice }}</p>
      <p><strong>Cupos disponibles:</strong> {{ availableSeats }}</p>
      <p><strong>Ocupación:</strong> {{ occupancyPercentage }}%</p>
      <p class="status-text"><strong>Estado:</strong> {{ statusLabel }}</p>
    </div>

    <div
      class="progress"
      role="progressbar"
      aria-label="Porcentaje de ocupación"
      :aria-valuenow="occupancyPercentage"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="progress__fill" :style="{ width: `${occupancyPercentage}%` }"></div>
    </div>

    <button
      class="reserve-btn"
      type="button"
      :disabled="isSoldOut"
      @click="emitReserve"
    >
      {{ isSoldOut ? 'Agotado' : 'Reservar cupo' }}
    </button>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  currencyCode: {
    type: String,
    default: 'CLP'
  }
})

const emit = defineEmits(['reserve', 'toggle-favorite'])

// Valor derivado: no se guarda porque se calcula desde los datos base.
const availableSeats = computed(() => {
  return props.event.cuposTotales - props.event.cuposReservados
})

const occupancyPercentage = computed(() => {
  return Math.round(
    (props.event.cuposReservados / props.event.cuposTotales) * 100
  )
})

const isSoldOut = computed(() => availableSeats.value <= 0)

const formattedPrice = computed(() => {
  if (props.event.precio === 0) return 'Gratis'

  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: props.currencyCode
  }).format(props.event.precio)
})

// La lógica de clases queda en script para no ensuciar el template.
const statusClass = computed(() => {
  if (occupancyPercentage.value === 100) return 'sold-out'
  if (occupancyPercentage.value >= 50) return 'almost-full'
  return 'available'
})

const statusLabel = computed(() => {
  if (occupancyPercentage.value === 100) return 'Agotado'
  if (occupancyPercentage.value >= 50) return 'Por agotarse'
  return 'Disponible'
})

function emitReserve() {
  emit('reserve', props.event.id)
}

function emitToggleFavorite() {
  emit('toggle-favorite', props.event.id)
}
</script>

<style scoped>
.card {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border-radius: 14px;
  border: 2px solid transparent;
  background: white;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
}

.card__header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.card__body {
  display: grid;
  gap: 0.4rem;
}

.category {
  font-size: 0.875rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
}

.favorite-btn,
.reserve-btn {
  min-width: 44px;
  min-height: 44px;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  cursor: pointer;
}

.favorite-btn {
  background: #fef3c7;
}

.reserve-btn {
  background: #2563eb;
  color: white;
}

.reserve-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.progress {
  width: 100%;
  height: 12px;
  overflow: hidden;
  border-radius: 999px;
  background: #e2e8f0;
}

.progress__fill {
  height: 100%;
  background: #2563eb;
  transition: width 0.3s ease;
}

.available {
  border-color: #22c55e;
}

.almost-full {
  border-color: #f59e0b;
}

.sold-out {
  border-color: #ef4444;
  background: #fef2f2;
  opacity: 0.95;
}

.sold-out .status-text {
  font-weight: 700;
  text-transform: uppercase;
}
</style>