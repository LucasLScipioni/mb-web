<script setup>
  import Header from '@/components/header/Header.vue';
  import RegistrationForm from './components/forms/registration/RegistrationForm.vue';
</script>

<template>
  <div class="app">
    <Header />

    <div class="app__content">
      <RegistrationForm />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    width: 100vw;
    height: 100vh;

    &__content {
      min-height: calc(100vh - 85px);
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
</style>
