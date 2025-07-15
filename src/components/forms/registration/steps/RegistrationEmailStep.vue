<script setup>
  import MBInput from '@/components/input/MBInput.vue';
  import { useRegistration } from '@/hooks/registration';
  import { onMounted, ref } from 'vue';

  const emit = defineEmits(['validation']);

  const { registrationDTO, setStepData } = useRegistration();

  const email = ref('');
  const userType = ref('fisica');

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const validateForm = () => {
    const data = { email: email.value, userType: userType.value };
    const isValid = validateEmail(email.value) && userType.value;

    setStepData({
      step: 0,
      isValid,
      data,
    });

    emit('validation', { isValid, data });
  };

  const syncLocalData = () => {
    email.value = registrationDTO.value.email || '';
    userType.value = registrationDTO.value.userType || 'fisica';
  };

  onMounted(() => {
    syncLocalData();
    validateForm();
  });
</script>

<template>
  <div class="registration-email-step">
    <MBInput
      v-model="email"
      @input="validateForm"
      id="email"
      type="email"
      label="Endereço de e-mail:"
    />
    <div class="registration-email-step__type">
      <div class="registration-email-step__radio">
        <input
          v-model="userType"
          @change="validateForm"
          type="radio"
          id="cpf"
          value="fisica"
        />
        <label for="cpf">Pessoa Física</label>
      </div>
      <div class="registration-email-step__radio">
        <input
          v-model="userType"
          @change="validateForm"
          type="radio"
          id="cnpj"
          value="juridica"
        />
        <label for="cnpj">Pessoa Jurídica</label>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .registration-email-step {
    display: flex;
    flex-direction: column;
    background-color: $background-overflow-color;
    border-radius: 8px;
    gap: 16px;

    &__type {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }

    &__radio {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
</style>
