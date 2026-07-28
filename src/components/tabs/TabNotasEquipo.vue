<template>
  <BasePanel>
    <template #header>
      <div>
        <h3>Notas del equipo</h3>
        <p>Estas notas se conservan al cambiar de pestaña.</p>
      </div>
    </template>

    <label class="notes-label" for="team-notes">Notas internas</label>
    <textarea
      id="team-notes"
      v-model="notes"
      rows="8"
      placeholder="Escribe aquí observaciones del equipo..."
    />

    <p class="status">
      Estado del componente: {{ activationMessage }}
    </p>

    <template #actions>
      <button type="button" @click="clearNotes">Limpiar nota</button>
    </template>
  </BasePanel>
</template>

<script setup>
import { ref, onActivated, onDeactivated } from 'vue'
import BasePanel from '../BasePanel.vue'

const notes = ref('')
const activationMessage = ref('Activo')

onActivated(() => {
  activationMessage.value = 'Activado con KeepAlive'
})

onDeactivated(() => {
  activationMessage.value = 'Desactivado temporalmente'
})

function clearNotes() {
  notes.value = ''
}
</script>

<style scoped>
.notes-label {
  font-weight: 600;
}

textarea {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  resize: vertical;
  font: inherit;
}

.status {
  color: #475569;
  font-size: 0.95rem;
}

button {
  min-width: 44px;
  min-height: 44px;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  background: #0f172a;
  color: white;
  cursor: pointer;
}
</style>