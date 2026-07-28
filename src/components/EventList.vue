<template>
  <section class="event-list">
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
      currency-code="CLP"
      @reserve="$emit('reserve', $event)"
      @release="$emit('release', $event)"
      @toggle-favorite="$emit('toggle-favorite', $event)"
      @delete-event="$emit('delete-event', $event)"
    />
  </section>
</template>

<script setup>
import EventCard from './EventCard.vue'

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
.event-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
</style>