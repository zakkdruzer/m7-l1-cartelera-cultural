<template>
  <div class="filters">
    <div class="field">
      <label for="search">Buscar por título</label>
      <input
        id="search"
        :value="searchTerm"
        type="text"
        placeholder="Ej: jazz, cerámica, teatro..."
        @input="$emit('update:searchTerm', $event.target.value)"
      />
    </div>

    <div class="field">
      <label for="category">Filtrar por categoría</label>
      <select
        id="category"
        :value="selectedCategory"
        @change="$emit('update:selectedCategory', $event.target.value)"
      >
        <option value="">Todas</option>
        <option value="Taller">Taller</option>
        <option value="Concierto">Concierto</option>
        <option value="Teatro">Teatro</option>
        <option value="Exposición">Exposición</option>
      </select>
    </div>

    <label class="checkbox">
      <input
        :checked="onlyAvailable"
        type="checkbox"
        @change="$emit('update:onlyAvailable', $event.target.checked)"
      />
      Mostrar solo disponibles
    </label>
  </div>
</template>

<script setup>
defineProps({
  searchTerm: {
    type: String,
    default: ''
  },
  selectedCategory: {
    type: String,
    default: ''
  },
  onlyAvailable: {
    type: Boolean,
    default: false
  }
})

defineEmits([
  'update:searchTerm',
  'update:selectedCategory',
  'update:onlyAvailable'
])
</script>

<style scoped>
.filters {
  display: grid;
  gap: 1rem;
}

.field {
  display: grid;
  gap: 0.5rem;
}

input,
select {
  min-height: 44px;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-height: 44px;
  font-weight: 600;
}
</style>