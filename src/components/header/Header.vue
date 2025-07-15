<script setup></script>

<template>
  <div class="header">
    <img
      class="header__logo"
      src="https://static.mercadobitcoin.com.br/web/img/logos/mb/logo-icon-color.svg"
      alt="Logo"
    />
    <h1 class="header__title">Desafio MB Web</h1>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    width: 100vw;
    height: 85px;
    background: $background-overflow-color;

    &__logo {
      width: 50px;
      height: 50px;
    }

    &__title {
      font-size: 24px;
      font-weight: 600;
      color: $primary-color;
    }
  }
</style>
