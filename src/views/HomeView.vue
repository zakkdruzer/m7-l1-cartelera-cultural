<template>
  <section class="home">
    <NotificationToast
      :message="notification.message"
      :type="notification.type"
    />

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

    <SearchBar
      :search-term="searchTerm"
      :selected-category="selectedCategory"
      :only-available="onlyAvailable"
      @update:searchTerm="searchTerm = $event"
      @update:selectedCategory="selectedCategory = $event"
      @update:onlyAvailable="onlyAvailable = $event"
    />

    <LoadingState v-if="isLoading" />

    <template v-else>
      <EmptyState
        v-if="filteredEvents.length === 0"
        @clear="clearAllFilters"
      />

      <EventList
        v-else
        :events="filteredEvents"
        @reserve="handleReserve"
        @release="handleRelease"
        @toggle-favorite="handleToggleFavorite"
        @delete-event="handleDeleteEvent"
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
import NotificationToast from '../components/NotificationToast.vue'

const events = ref([])
const isLoading = ref(true)
const searchTerm = ref('')
const selectedCategory = ref('')
const onlyAvailable = ref(false)
const showTimer = ref(true)

const notification = ref({
  message: '',
  type: 'info'
})

let notificationTimeoutId = null

onMounted(() => {
  setTimeout(() => {
    events.value = initialEvents
    isLoading.value = false
  }, 1000)
})

const filteredEvents = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  return events.value.filter((event) => {
    const matchesTitle = event.titulo.toLowerCase().includes(query)

    const matchesCategory = selectedCategory.value
      ? event.categoria === selectedCategory.value
      : true

    const matchesAvailability = onlyAvailable.value
      ? event.cuposReservados < event.cuposTotales
      : true

    return matchesTitle && matchesCategory && matchesAvailability
  })
})

const totalReservedSeats = computed(() =>
  events.value.reduce((acc, event) => acc + event.cuposReservados, 0)
)

function showNotification(message, type = 'info') {
  notification.value = { message, type }

  if (notificationTimeoutId) {
    clearTimeout(notificationTimeoutId)
  }

  notificationTimeoutId = setTimeout(() => {
    notification.value = { message: '', type: 'info' }
  }, 2500)
}

function handleReserve(eventId) {
  let updated = false

  events.value = events.value.map((event) => {
    if (event.id !== eventId) return event
    if (event.cuposReservados >= event.cuposTotales) return event

    updated = true

    return {
      ...event,
      cuposReservados: event.cuposReservados + 1
    }
  })

  if (updated) {
    showNotification('Cupo reservado correctamente.', 'success')
  }
}

function handleRelease(eventId) {
  let updated = false

  events.value = events.value.map((event) => {
    if (event.id !== eventId) return event
    if (event.cuposReservados <= 0) return event

    updated = true

    return {
      ...event,
      cuposReservados: event.cuposReservados - 1
    }
  })

  if (updated) {
    showNotification('Se liberó un cupo.', 'warning')
  }
}

function handleToggleFavorite(eventId) {
  events.value = events.value.map((event) => {
    if (event.id !== eventId) return event

    return {
      ...event,
      favorito: !event.favorito
    }
  })

  showNotification('Favorito actualizado.', 'info')
}

function handleDeleteEvent(eventId) {
  const eventToDelete = events.value.find((event) => event.id === eventId)

  if (!eventToDelete) return

  const confirmed = window.confirm(
    `¿Seguro que quieres cancelar "${eventToDelete.titulo}"?`
  )

  if (!confirmed) return

  events.value = events.value.filter((event) => event.id !== eventId)
  showNotification('El evento fue cancelado.', 'error')
}

function clearAllFilters() {
  searchTerm.value = ''
  selectedCategory.value = ''
  onlyAvailable.value = false
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