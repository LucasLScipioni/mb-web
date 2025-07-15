<script setup>
  import { computed, useAttrs } from 'vue';

  const props = defineProps({
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary'].includes(value),
    },
  });

  const attrs = useAttrs();

  const buttonClasses = computed(() => {
    return {
      'mb-button': true,
      'mb-button__primary': props.variant === 'primary',
      'mb-button__secondary': props.variant === 'secondary',
    };
  });
</script>

<template>
  <button :class="buttonClasses" v-bind="attrs">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
  .mb-button {
    width: 100%;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &__primary {
      background-color: $primary-color;
      color: white;
      border-color: $primary-color;

      &:hover:not(:disabled) {
        background-color: darken($primary-color, 10%);
        border-color: darken($primary-color, 10%);
      }
    }

    &__secondary {
      background-color: white;
      color: $primary-color;
      border-color: $primary-color;

      &:hover:not(:disabled) {
        background-color: lighten($primary-color, 45%);
      }
    }
  }
</style>
