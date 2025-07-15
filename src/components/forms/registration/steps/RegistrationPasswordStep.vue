<script setup>
  import MBInput from '@/components/input/MBInput.vue';
  import { useRegistration } from '@/hooks/registration';
  import { computed, onMounted, ref } from 'vue';

  const emit = defineEmits(['validation']);

  const { registrationDTO, setStepData } = useRegistration();

  const password = ref('');

  const hasMinLength = computed(() => password.value.length >= 8);
  const hasUppercase = computed(() => /[A-Z]/.test(password.value));
  const hasLowercase = computed(() => /[a-z]/.test(password.value));
  const hasSpecialChar = computed(() =>
    /[!@#$%^&*(),.?":{}|<>]/.test(password.value)
  );

  const isValidPassword = computed(
    () =>
      hasMinLength.value &&
      hasUppercase.value &&
      hasLowercase.value &&
      hasSpecialChar.value
  );

  const validateForm = () => {
    const data = { password: password.value };

    setStepData({
      step: 2,
      isValid: isValidPassword.value,
      data,
    });

    emit('validation', { isValid: isValidPassword.value, data });
  };

  const syncLocalData = () => {
    password.value = registrationDTO.value.password || '';
  };

  onMounted(() => {
    syncLocalData();
    validateForm();
  });
</script>

<template>
  <div class="registration-password-step">
    <MBInput
      v-model="password"
      @input="validateForm"
      id="password"
      type="password"
      label="Sua senha"
    />

    <div class="registration-password-step__requirements">
      <div
        class="registration-password-step__requirement"
        :class="{
          'registration-password-step__requirement-valid': hasMinLength,
        }"
      >
        <span class="registration-password-step__check">✓</span>
        Senha com no mínimo 8 caracteres
      </div>

      <div
        class="registration-password-step__requirement"
        :class="{
          'registration-password-step__requirement-valid': hasUppercase,
        }"
      >
        <span class="registration-password-step__check">✓</span>
        Ao menos uma letra maiúscula
      </div>

      <div
        class="registration-password-step__requirement"
        :class="{
          'registration-password-step__requirement-valid': hasLowercase,
        }"
      >
        <span class="registration-password-step__check">✓</span>
        Ao menos uma letra minúscula
      </div>

      <div
        class="registration-password-step__requirement"
        :class="{
          'registration-password-step__requirement-valid': hasSpecialChar,
        }"
      >
        <span class="registration-password-step__check">✓</span>
        Um caracter especial
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .registration-password-step {
    display: flex;
    flex-direction: column;
    background-color: $background-overflow-color;
    border-radius: 8px;
    gap: 16px;

    &__requirements {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__requirement {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      font-size: 14px;
      transition: color 0.3s ease;

      &-valid {
        color: #22c55e;

        .registration-password-step__check {
          background-color: #22c55e;
          color: white;
        }
      }
    }

    &__check {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #e5e7eb;
      color: transparent;
      font-size: 10px;
      font-weight: bold;
      transition: all 0.3s ease;
    }
  }
</style>
