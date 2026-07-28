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
          Mostrando {{ filteredAndSortedEvents.length }} de {{ events.length }} eventos
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
      :sort-by="sortBy"
      :only-available="onlyAvailable"
      :accent-color="accentColor"
      @update:searchTerm="searchTerm = $event"
      @update:selectedCategory="selectedCategory = $event"
      @update:sortBy="sortBy = $event"
      @update:onlyAvailable="onlyAvailable = $event"
      @update:accentColor="accentColor = $event"
    />

    <LoadingState v-if="isLoading" />

    <template v-else>
      <EmptyState
        v-if="filteredAndSortedEvents.length === 0"
        @clear="clearAllFilters"
      />

      <TabsSection
        v-else
        class="tabs-themed"
        :events="filteredAndSortedEvents"
        :accent-color="accentColor"
        @reserve="reserveEvent"
        @release="releaseEvent"
        @toggle-favorite="toggleFavorite"
        @delete-event="handleDeleteEvent"
        @create-event="createEvent"
      />
    </template>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import SessionTimer from '../components/SessionTimer.vue'
import LoadingState from '../components/LoadingState.vue'
import EmptyState from '../components/EmptyState.vue'
import NotificationToast from '../components/NotificationToast.vue'
import TabsSection from '../components/TabsSection.vue'
import { useEvents } from '../composables/useEvents'

const {
  events,
  notification,
  totalReservedSeats,
  reserveEvent,
  releaseEvent,
  toggleFavorite,
  deleteEvent,
  createEvent
} = useEvents()

const isLoading = ref(true)

const searchTerm = ref('')
const selectedCategory = ref('')
const sortBy = ref('default')
const onlyAvailable = ref(false)
const accentColor = ref('#2563eb')

const showTimer = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

const filteredAndSortedEvents = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  const filtered = events.value.filter((event) => {
    const matchesTitle = event.titulo.toLowerCase().includes(query)

    const matchesCategory = selectedCategory.value
      ? event.categoria === selectedCategory.value
      : true

    const matchesAvailability = onlyAvailable.value
      ? event.cuposReservados < event.cuposTotales
      : true

    return matchesTitle && matchesCategory && matchesAvailability
  })

  const sorted = [...filtered]

  switch (sortBy.value) {
    case 'price-asc':
      sorted.sort((a, b) => a.precio - b.precio)
      break
    case 'price-desc':
      sorted.sort((a, b) => b.precio - a.precio)
      break
    case 'availability-asc':
      sorted.sort(
        (a, b) =>
          (a.cuposTotales - a.cuposReservados) -
          (b.cuposTotales - b.cuposReservados)
      )
      break
    case 'availability-desc':
      sorted.sort(
        (a, b) =>
          (b.cuposTotales - b.cuposReservados) -
          (a.cuposTotales - a.cuposReservados)
      )
      break
    default:
      break
  }

  return sorted
})

function handleDeleteEvent(eventId) {
  const eventToDelete = events.value.find((event) => event.id === eventId)

  if (!eventToDelete) return

  const confirmed = window.confirm(
    `¿Seguro que quieres cancelar "${eventToDelete.titulo}"?`
  )

  if (!confirmed) return

  deleteEvent(eventId)
}

function clearAllFilters() {
  searchTerm.value = ''
  selectedCategory.value = ''
  sortBy.value = 'default'
  onlyAvailable.value = false
  accentColor.value = '#2563eb'
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
  background: v-bind(accentColor);
  color: white;
  cursor: pointer;
}

.tabs-themed {
  --accent-color: v-bind(accentColor);
}
</style>