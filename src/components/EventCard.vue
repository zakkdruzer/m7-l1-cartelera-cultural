<template>
  <article class="card" :class="statusClass">
    <span v-if="showHighlight" class="highlight-badge">Destacado</span>

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

    <div class="card__actions">
      <button
        class="reserve-btn"
        type="button"
        :disabled="isSoldOut"
        @click="emitReserve"
      >
        {{ isSoldOut ? 'Agotado' : 'Reservar cupo' }}
      </button>

      <button
        class="release-btn"
        type="button"
        :disabled="event.cuposReservados === 0"
        @click="emitRelease"
      >
        Liberar cupo
      </button>

      <button
        class="delete-btn"
        type="button"
        @click="emitDelete"
      >
        Cancelar evento
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true,
    validator(value) {
      return ['Taller', 'Concierto', 'Teatro', 'Exposición'].includes(value.categoria)
    }
  },
  currencyCode: {
    type: String,
    default: 'CLP'
  },
  showHighlight: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'reserve',
  'release',
  'toggle-favorite',
  'delete-event'
])

const availableSeats = computed(() => {
  return props.event.cuposTotales - props.event.cuposReservados
})

const occupancyPercentage = computed(() => {
  return Math.round(
    (props.event.cuposReservados / props.event.cuposTotales) * 100
  )
})

const isSoldOut = computed(() => {
  return availableSeats.value <= 0
})

const formattedPrice = computed(() => {
  if (props.event.precio === 0) return 'Gratis'

  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: props.currencyCode
  }).format(props.event.precio)
})

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

function emitRelease() {
  emit('release', props.event.id)
}

function emitToggleFavorite() {
  emit('toggle-favorite', props.event.id)
}

function emitDelete() {
  emit('delete-event', props.event.id)
}
</script>

<style scoped>
.card {
  display: grid;
  gap: 0.85rem;
  padding: 1rem;
  border-radius: 14px;
  border: 2px solid transparent;
  background: var(--surface-color);
  color: var(--text-color);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
}

.highlight-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-bottom: -0.15rem;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: #f59e0b;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.card__header > div:first-child {
  flex: 1;
  min-width: 0;
}

.card__body {
  display: grid;
  gap: 0.4rem;
}

.card__actions {
  display: grid;
  gap: 0.75rem;
}

.category {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-soft);
  text-transform: uppercase;
}

.favorite-btn,
.reserve-btn,
.release-btn,
.delete-btn {
  min-width: 44px;
  min-height: 44px;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  cursor: pointer;
}

.favorite-btn {
  flex-shrink: 0;
  min-width: 92px;
  display: grid;
  place-items: center;
  gap: 0.25rem;
  text-align: center;
  background: var(--surface-soft);
  color: var(--text-color);
  white-space: normal;
  word-break: break-word;
}

.reserve-btn {
  background: var(--button-bg);
  color: var(--button-text);
}

.release-btn {
  background: #0f766e;
  color: white;
}

.delete-btn {
  background: #dc2626;
  color: white;
}

.reserve-btn:disabled,
.release-btn:disabled {
  background: var(--border-color);
  color: var(--text-soft);
  cursor: not-allowed;
}

.progress {
  width: 100%;
  height: 12px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--surface-soft);
}

.progress__fill {
  height: 100%;
  background: var(--button-bg);
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
}

.sold-out .status-text {
  font-weight: 700;
  text-transform: uppercase;
}
</style>