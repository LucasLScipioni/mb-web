<script setup>
  import { defineEmits, useAttrs } from 'vue';

  const attrs = useAttrs();
  const emit = defineEmits(['update:modelValue']);

  function onInput(event) {
    emit('update:modelValue', event.target.value);
  }
</script>

<template>
  <div class="mb-input">
    <label v-if="attrs.label" :for="attrs.id" class="mb-input__label">
      {{ attrs.label }}
    </label>
    <input
      v-bind="attrs"
      :value="attrs.modelValue"
      @input="onInput"
      class="mb-input__input"
    />
  </div>
</template>

<style lang="scss" scoped>
  .mb-input {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__input {
      width: 100%;
      padding: 8px;
      border-radius: 8px;
      border: 1px solid $border-dark-color;
      outline: none;

      &:hover,
      &:focus {
        border-color: lighten($border-dark-color, 35%);
      }
    }
  }
</style>
