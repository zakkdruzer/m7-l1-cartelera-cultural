<template>
  <section class="tabs-wrapper">
    <div
      class="tabs-nav"
      role="tablist"
      aria-label="Secciones internas"
    >
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :id="`tab-${tab.key}`"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        role="tab"
        type="button"
        :aria-selected="activeTab === tab.key"
        :aria-controls="`panel-${tab.key}`"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <KeepAlive>
      <component
        :is="activeComponent"
        :id="`panel-${activeTab}`"
        class="tab-panel"
        role="tabpanel"
        :aria-labelledby="`tab-${activeTab}`"
        :events="events"
        @reserve="$emit('reserve', $event)"
        @release="$emit('release', $event)"
        @toggle-favorite="$emit('toggle-favorite', $event)"
        @delete-event="$emit('delete-event', $event)"
        @create-event="$emit('create-event', $event)"
      />
    </KeepAlive>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import TabCartelera from './tabs/TabCartelera.vue'
import TabResumenMes from './tabs/TabResumenMes.vue'
import TabNotasEquipo from './tabs/TabNotasEquipo.vue'
import TabCrearEvento from './tabs/TabCrearEvento.vue'

defineProps({
  events: {
    type: Array,
    required: true
  },
  accentColor: {
    type: String,
    default: '#2563eb'
  }
})

defineEmits([
  'reserve',
  'release',
  'toggle-favorite',
  'delete-event',
  'create-event'
])

const tabs = [
  {
    key: 'cartelera',
    label: 'Cartelera',
    component: TabCartelera
  },
  {
    key: 'resumen',
    label: 'Resumen del mes',
    component: TabResumenMes
  },
  {
    key: 'notas',
    label: 'Notas del equipo',
    component: TabNotasEquipo
  },
  {
    key: 'crear',
    label: 'Crear evento',
    component: TabCrearEvento
  }
]

const activeTab = ref('cartelera')

const activeComponent = computed(() => {
  return tabs.find((tab) => tab.key === activeTab.value)?.component
})
</script>

<style scoped>
.tabs-wrapper {
  display: grid;
  gap: 1rem;
}

.tabs-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tab-btn {
  min-width: 44px;
  min-height: 44px;
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  background: #e2e8f0;
  color: #0f172a;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  border-color: v-bind(accentColor);
}

.tab-btn.active {
  background: v-bind(accentColor);
  color: white;
}

.tab-btn:focus-visible {
  outline: 3px solid color-mix(in srgb, v-bind(accentColor) 35%, white);
  outline-offset: 2px;
}

.tab-panel {
  min-width: 0;
}
</style>