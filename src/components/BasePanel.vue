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
  background: var(--surface-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
}

.panel__header {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.75rem;
  color: var(--text-color);
}

.panel__header :deep(h1),
.panel__header :deep(h2),
.panel__header :deep(h3),
.panel__header :deep(h4),
.panel__header :deep(h5),
.panel__header :deep(h6),
.panel__header :deep(p) {
  margin: 0;
  color: inherit;
}

.panel__body {
  display: grid;
  gap: 0.75rem;
  color: var(--text-color);
}

.panel__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-color);
}
</style>