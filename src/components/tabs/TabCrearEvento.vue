<template>
  <EventForm @create-event="$emit('create-event', $event)" />
</template>

<script setup>
import EventForm from '../EventForm.vue'

defineEmits(['create-event'])
</script>