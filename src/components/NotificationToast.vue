<template>
  <transition name="fade">
    <div v-if="message" class="toast" :class="type">
      <p>{{ message }}</p>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info'
  }
})
</script>

<style scoped>
.toast {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  min-width: 260px;
  max-width: 340px;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  color: white;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);
}

.toast.info {
  background: #2563eb;
}

.toast.success {
  background: #16a34a;
}

.toast.warning {
  background: #d97706;
}

.toast.error {
  background: #dc2626;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>