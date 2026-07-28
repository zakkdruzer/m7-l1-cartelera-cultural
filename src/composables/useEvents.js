import { computed, ref, watch } from 'vue'
import { initialEvents } from '../data/events'

const STORAGE_KEY = 'cartelera-cultural-events'

export function useEvents() {
  const events = ref(loadEvents())

  const notification = ref({
    message: '',
    type: 'info'
  })

  let notificationTimeoutId = null

  const totalReservedSeats = computed(() =>
    events.value.reduce((acc, event) => acc + event.cuposReservados, 0)
  )

  function loadEvents() {
    const savedEvents = localStorage.getItem(STORAGE_KEY)

    if (!savedEvents) return initialEvents

    try {
      return JSON.parse(savedEvents)
    } catch {
      return initialEvents
    }
  }

  watch(
    events,
    (newEvents) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents))
    },
    { deep: true }
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

  function reserveEvent(eventId) {
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

  function releaseEvent(eventId) {
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

  function toggleFavorite(eventId) {
    events.value = events.value.map((event) => {
      if (event.id !== eventId) return event

      return {
        ...event,
        favorito: !event.favorito
      }
    })

    showNotification('Favorito actualizado.', 'info')
  }

  function deleteEvent(eventId) {
    const eventToDelete = events.value.find((event) => event.id === eventId)

    if (!eventToDelete) return false

    events.value = events.value.filter((event) => event.id !== eventId)
    showNotification('El evento fue cancelado.', 'error')
    return true
  }

  function createEvent(newEvent) {
    events.value = [
      ...events.value,
      {
        ...newEvent,
        id: Date.now(),
        favorito: false
      }
    ]

    showNotification('Evento creado correctamente.', 'success')
  }

  function resetEvents() {
    events.value = initialEvents
    showNotification('Se restauró la cartelera inicial.', 'info')
  }

  return {
    events,
    notification,
    totalReservedSeats,
    reserveEvent,
    releaseEvent,
    toggleFavorite,
    deleteEvent,
    createEvent,
    resetEvents,
    showNotification
  }
}