<template>
  <section class="filters">
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

    <div class="field">
      <label for="sort">Ordenar por</label>
      <select
        id="sort"
        :value="sortBy"
        @change="$emit('update:sortBy', $event.target.value)"
      >
        <option value="default">Orden original</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
        <option value="availability-asc">Disponibilidad: menor a mayor</option>
        <option value="availability-desc">Disponibilidad: mayor a menor</option>
      </select>
    </div>

    <div class="field checkbox-field">
      <label for="available">
        <input
          id="available"
          :checked="onlyAvailable"
          type="checkbox"
          @change="$emit('update:onlyAvailable', $event.target.checked)"
        />
        Mostrar solo disponibles
      </label>
    </div>

    <div class="field">
      <label for="accent">Color de acento</label>
      <input
        id="accent"
        :value="accentColor"
        type="color"
        @input="$emit('update:accentColor', $event.target.value)"
      />
    </div>
  </section>
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
  sortBy: {
    type: String,
    default: 'default'
  },
  onlyAvailable: {
    type: Boolean,
    default: false
  },
  accentColor: {
    type: String,
    default: '#2563eb'
  }
})

defineEmits([
  'update:searchTerm',
  'update:selectedCategory',
  'update:sortBy',
  'update:onlyAvailable',
  'update:accentColor'
])
</script>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  padding: 1rem;
  border-radius: 14px;
  background: white;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
}

.field {
  display: grid;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #334155;
}

input[type='text'],
select {
  min-height: 44px;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
}

input[type='color'] {
  width: 100%;
  min-height: 44px;
  padding: 0.25rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: white;
  cursor: pointer;
}

.checkbox-field {
  align-self: end;
}

.checkbox-field label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 44px;
  font-weight: 600;
}

input[type='checkbox'] {
  width: 18px;
  height: 18px;
}
</style>