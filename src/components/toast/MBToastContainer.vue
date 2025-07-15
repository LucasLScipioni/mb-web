<script setup>
  import { useToast } from '@/hooks/toast';
  import MBToast from './MBToast.vue';

  const { toasts, removeToast } = useToast();

  const handleToastClose = toastId => {
    removeToast(toastId);
  };
</script>

<template>
  <div class="mb-toast-container">
    <MBToast
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :type="toast.type"
      :duration="toast.duration"
      :visible="toast.visible"
      @close="handleToastClose(toast.id)"
    />
  </div>
</template>

<style lang="scss" scoped>
  .mb-toast-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    pointer-events: none;
  }

  .mb-toast-container > * {
    pointer-events: auto;
    margin-bottom: 8px;
  }
</style>
