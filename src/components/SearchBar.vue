<template>
  <div class="search-box">
    <label for="search">Buscar por título</label>
    <input
      id="search"
      :value="modelValue"
      type="text"
      placeholder="Ej: jazz, cerámica, teatro..."
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-box {
  display: grid;
  gap: 0.5rem;
}

input {
  min-height: 44px;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 1rem;
}
</style>