<template>
  <section class="panel">
    <header class="panel__header">
      <slot name="header">
        <h3>Panel</h3>
      </slot>
    </header>

    <div class="panel__body">
      <slot>
        <p>Sin contenido disponible.</p>
      </slot>
    </div>

    <footer v-if="$slots.actions" class="panel__actions">
      <slot name="actions" />
    </footer>
  </section>
</template>

<style scoped>
.panel {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border-radius: 14px;
  background: white;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
}

.panel__header {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.75rem;
}

.panel__body {
  display: grid;
  gap: 0.75rem;
}

.panel__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
}
</style>