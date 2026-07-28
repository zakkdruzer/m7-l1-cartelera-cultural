<template>
  <section class="home">
    <div class="top-panel">
      <div class="summary">
        <h2>Eventos disponibles</h2>
        <p>
          Mostrando {{ filteredEvents.length }} de {{ events.length }} eventos
        </p>
        <p>Total de cupos reservados: {{ totalReservedSeats }}</p>
      </div>

      <button class="toggle-btn" @click="showTimer = !showTimer">
        {{ showTimer ? 'Ocultar contador' : 'Mostrar contador' }}
      </button>
    </div>

    <SessionTimer v-if="showTimer" />

    <SearchBar v-model="searchTerm" />

    <LoadingState v-if="isLoading" />

    <template v-else>
      <EmptyState
        v-if="filteredEvents.length === 0"
        @clear="clearSearch"
      />

      <EventList
        v-else
        :events="filteredEvents"
        @reserve="handleReserve"
        @toggle-favorite="handleToggleFavorite"
      />
    </template>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { initialEvents } from '../data/events'
import EventList from '../components/EventList.vue'
import SearchBar from '../components/SearchBar.vue'
import SessionTimer from '../components/SessionTimer.vue'
import LoadingState from '../components/LoadingState.vue'
import EmptyState from '../components/EmptyState.vue'

const events = ref([])
const isLoading = ref(true)
const searchTerm = ref('')
const showTimer = ref(true)

// Simula una carga asíncrona parecida a una petición al servidor.
onMounted(() => {
  setTimeout(() => {
    events.value = initialEvents
    isLoading.value = false
  }, 1000)
})

// Valor derivado: nunca destruye el arreglo original.
const filteredEvents = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  if (!query) return events.value

  return events.value.filter((event) =>
    event.titulo.toLowerCase().includes(query)
  )
})

// Total visible en el componente raíz, tal como pide la actividad.
const totalReservedSeats = computed(() =>
  events.value.reduce((acc, event) => acc + event.cuposReservados, 0)
)

// El hijo no modifica datos directamente, solo emite el id.
function handleReserve(eventId) {
  events.value = events.value.map((event) => {
    if (event.id !== eventId) return event

    if (event.cuposReservados >= event.cuposTotales) return event

    return {
      ...event,
      cuposReservados: event.cuposReservados + 1
    }
  })
}

function handleToggleFavorite(eventId) {
  events.value = events.value.map((event) => {
    if (event.id !== eventId) return event

    return {
      ...event,
      favorito: !event.favorito
    }
  })
}

function clearSearch() {
  searchTerm.value = ''
}
</script>

<style scoped>
.home {
  display: grid;
  gap: 1.5rem;
}

.top-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.summary {
  display: grid;
  gap: 0.35rem;
}

.toggle-btn {
  min-width: 44px;
  min-height: 44px;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  background: #2563eb;
  color: white;
  cursor: pointer;
}
</style>