<template>
  <BasePanel>
    <template #header>
      <div>
        <h3>Cartelera</h3>
        <p>Vista principal de eventos culturales.</p>
      </div>
    </template>

    <EventList
      :events="events"
      @reserve="$emit('reserve', $event)"
      @release="$emit('release', $event)"
      @toggle-favorite="$emit('toggle-favorite', $event)"
      @delete-event="$emit('delete-event', $event)"
    >
      <template #item="{ event }">
        <div class="event-wrapper">
          <span v-if="event.favorito" class="badge">Destacado</span>

          <EventCard
            :event="event"
            currency-code="CLP"
            @reserve="$emit('reserve', $event)"
            @release="$emit('release', $event)"
            @toggle-favorite="$emit('toggle-favorite', $event)"
            @delete-event="$emit('delete-event', $event)"
          />
        </div>
      </template>
    </EventList>
  </BasePanel>
</template>

<script setup>
import BasePanel from '../BasePanel.vue'
import EventList from '../EventList.vue'
import EventCard from '../EventCard.vue'

defineProps({
  events: {
    type: Array,
    required: true
  }
})

defineEmits([
  'reserve',
  'release',
  'toggle-favorite',
  'delete-event'
])
</script>

<style scoped>
.event-wrapper {
  position: relative;
}

.badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 2;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: #f59e0b;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
}
</style>