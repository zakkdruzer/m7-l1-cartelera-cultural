<template>
  <BasePanel>
    <template #header>
      <div>
        <h3>Crear nuevo evento</h3>
        <p>Completa todos los campos para agregar un evento a la cartelera.</p>
      </div>
    </template>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="field">
        <label for="titulo">Título</label>
        <input id="titulo" v-model.trim="form.titulo" type="text" />
        <small v-if="errors.titulo" class="error">{{ errors.titulo }}</small>
      </div>

      <div class="field">
        <label for="categoria">Categoría</label>
        <select id="categoria" v-model="form.categoria">
          <option value="">Selecciona una categoría</option>
          <option value="Taller">Taller</option>
          <option value="Concierto">Concierto</option>
          <option value="Teatro">Teatro</option>
          <option value="Exposición">Exposición</option>
        </select>
        <small v-if="errors.categoria" class="error">{{ errors.categoria }}</small>
      </div>

      <div class="field">
        <label for="cuposTotales">Cupos totales</label>
        <input id="cuposTotales" v-model.number="form.cuposTotales" type="number" min="1" />
        <small v-if="errors.cuposTotales" class="error">{{ errors.cuposTotales }}</small>
      </div>

      <div class="field">
        <label for="cuposReservados">Cupos reservados</label>
        <input id="cuposReservados" v-model.number="form.cuposReservados" type="number" min="0" />
        <small v-if="errors.cuposReservados" class="error">{{ errors.cuposReservados }}</small>
      </div>

      <div class="field">
        <label for="precio">Precio</label>
        <input id="precio" v-model.number="form.precio" type="number" min="0" />
        <small v-if="errors.precio" class="error">{{ errors.precio }}</small>
      </div>

      <div class="actions">
        <button type="submit">Crear evento</button>
        <button type="button" class="secondary" @click="resetForm">Limpiar</button>
      </div>
    </form>
  </BasePanel>
</template>

<script setup>
import { reactive } from 'vue'
import BasePanel from './BasePanel.vue'

const emit = defineEmits(['create-event'])

const form = reactive({
  titulo: '',
  categoria: '',
  cuposTotales: 1,
  cuposReservados: 0,
  precio: 0
})

const errors = reactive({
  titulo: '',
  categoria: '',
  cuposTotales: '',
  cuposReservados: '',
  precio: ''
})

function validateForm() {
  errors.titulo = ''
  errors.categoria = ''
  errors.cuposTotales = ''
  errors.cuposReservados = ''
  errors.precio = ''

  let isValid = true

  if (!form.titulo) {
    errors.titulo = 'El título es obligatorio.'
    isValid = false
  }

  if (!form.categoria) {
    errors.categoria = 'Debes seleccionar una categoría.'
    isValid = false
  }

  if (form.cuposTotales < 1) {
    errors.cuposTotales = 'Los cupos totales deben ser al menos 1.'
    isValid = false
  }

  if (form.cuposReservados < 0) {
    errors.cuposReservados = 'Los cupos reservados no pueden ser negativos.'
    isValid = false
  }

  if (form.cuposReservados > form.cuposTotales) {
    errors.cuposReservados = 'Los cupos reservados no pueden superar los cupos totales.'
    isValid = false
  }

  if (form.precio < 0) {
    errors.precio = 'El precio no puede ser negativo.'
    isValid = false
  }

  return isValid
}

function handleSubmit() {
  if (!validateForm()) return

  emit('create-event', {
    titulo: form.titulo,
    categoria: form.categoria,
    cuposTotales: form.cuposTotales,
    cuposReservados: form.cuposReservados,
    precio: form.precio
  })

  resetForm()
}

function resetForm() {
  form.titulo = ''
  form.categoria = ''
  form.cuposTotales = 1
  form.cuposReservados = 0
  form.precio = 0

  errors.titulo = ''
  errors.categoria = ''
  errors.cuposTotales = ''
  errors.cuposReservados = ''
  errors.precio = ''
}
</script>

<style scoped>
.form {
  display: grid;
  gap: 1rem;
}

.field {
  display: grid;
  gap: 0.4rem;
}

label {
  font-weight: 600;
  color: #334155;
}

input,
select {
  min-height: 44px;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font: inherit;
}

.error {
  color: #dc2626;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

button {
  min-width: 44px;
  min-height: 44px;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

button.secondary {
  background: #64748b;
}
</style>