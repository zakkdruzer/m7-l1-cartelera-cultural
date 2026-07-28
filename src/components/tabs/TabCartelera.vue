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
    />
  </BasePanel>
</template>

<script setup>
import BasePanel from '../BasePanel.vue'
import EventList from '../EventList.vue'

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