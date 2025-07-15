<script setup>
  import { useRegistration } from '@/hooks/registration';
  import { computed, onMounted } from 'vue';
  import RegistrationDataStep from './RegistrationDataStep.vue';
  import RegistrationEmailStep from './RegistrationEmailStep.vue';
  import RegistrationPasswordStep from './RegistrationPasswordStep.vue';

  const { registrationDTO, setStepData, stepDataByIndex, setRegistrationData } =
    useRegistration();

  const handleStepValidation = validationData => {
    if (validationData.isValid) {
      setRegistrationData(validationData.data);
    }
  };

  const allStepsValid = computed(() => {
    const emailValid = stepDataByIndex.value[0]?.isValid || false;
    const dataValid = stepDataByIndex.value[1]?.isValid || false;
    const passwordValid = stepDataByIndex.value[2]?.isValid || false;

    return emailValid && dataValid && passwordValid;
  });

  const displayLabels = computed(() => {
    if (registrationDTO.value.userType === 'fisica') {
      return {
        userType: 'Pessoa Física',
        emailTitle: 'Endereço de e-mail',
        passwordTitle: 'Senha de acesso',
      };
    } else {
      return {
        userType: 'Pessoa Jurídica',
        emailTitle: 'Endereço de e-mail',
        passwordTitle: 'Senha de acesso',
      };
    }
  });

  const validateSummary = () => {
    setStepData({
      step: 3,
      isValid: allStepsValid.value,
      data: registrationDTO.value,
    });
  };

  onMounted(() => {
    validateSummary();
  });
</script>

<template>
  <div class="registration-summary-step">
    <div class="registration-summary-step__content">
      <div class="registration-summary-step__section">
        <h3 class="registration-summary-step__section-title">
          {{ displayLabels.emailTitle }}
        </h3>
        <div class="registration-summary-step__step-wrapper">
          <RegistrationEmailStep @validation="handleStepValidation" />
        </div>
      </div>

      <div class="registration-summary-step__section">
        <h3 class="registration-summary-step__section-title">
          {{ displayLabels.userType }}
        </h3>
        <div class="registration-summary-step__step-wrapper">
          <RegistrationDataStep @validation="handleStepValidation" />
        </div>
      </div>

      <div class="registration-summary-step__section">
        <h3 class="registration-summary-step__section-title">
          {{ displayLabels.passwordTitle }}
        </h3>
        <div class="registration-summary-step__step-wrapper">
          <RegistrationPasswordStep @validation="handleStepValidation" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .registration-summary-step {
    display: flex;
    flex-direction: column;
    gap: 24px;

    &__content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    &__section {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;
      transition: all 0.2s ease-in-out;

      &:hover {
        border-color: $primary-color;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    &__section-title {
      font-size: 16px;
      font-weight: 600;
      color: $text-color;
      margin: 0;
      padding-bottom: 8px;
      border-bottom: 2px solid $primary-color;
    }
  }

  @media (max-width: 768px) {
    .registration-summary-step {
      &__section {
        padding: 16px;
      }
    }
  }
</style>
