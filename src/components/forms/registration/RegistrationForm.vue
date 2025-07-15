<script setup>
  import MBButton from '@/components/input/MBButton.vue';
  import { useRegistration } from '@/hooks/registration';
  import { computed, ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import RegistrationDataStep from './steps/RegistrationDataStep.vue';
  import RegistrationEmailStep from './steps/RegistrationEmailStep.vue';
  import RegistrationPasswordStep from './steps/RegistrationPasswordStep.vue';
  import RegistrationSummaryStep from './steps/RegistrationSummaryStep.vue';

  const { registrationDTO, stepIndex, stepDataByIndex, setRegistrationData } =
    useRegistration();

  const toast = useToast();

  const isSubmitting = ref(false);

  const stepsDisplayInfo = [
    {
      component: RegistrationEmailStep,
      label: 'Seja bem vindo(a)!',
    },
    { component: RegistrationDataStep, label: 'Dados Pessoais' },
    {
      component: RegistrationPasswordStep,
      label: 'Senha de Acesso',
    },
    {
      component: RegistrationSummaryStep,
      label: 'Revise suas informações',
    },
  ];

  const currentStepDisplayInfo = computed(() => {
    return stepsDisplayInfo[stepIndex.value];
  });

  const currentStepData = computed(() => {
    return stepDataByIndex.value[stepIndex.value];
  });

  const submitData = async () => {
    if (stepIndex.value < stepsDisplayInfo.length - 1) {
      setRegistrationData(stepDataByIndex.value[stepIndex.value].data);
      stepIndex.value++;
    } else {
      setRegistrationData(stepDataByIndex.value[stepIndex.value].data);

      isSubmitting.value = true;

      try {
        const response = await fetch('http://localhost:3001/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationDTO.value),
        });

        const result = await response.json();

        console.log('Registration result:', result);

        if (response.ok) {
          toast.success('Cadastro realizado com sucesso!');

          if (result.warnings && result.warnings.length > 0) {
            result.warnings.forEach(warning => {
              toast.warning(warning);
            });
          }
        } else {
          const errorMessage = result.message || 'Erro ao realizar cadastro';

          if (result.errors && result.errors.length > 0) {
            const detailedError = result.errors.join('. ');
            toast.error(detailedError);
          } else {
            toast.error(errorMessage);
          }
        }
      } catch (error) {
        toast.error('Erro de conexão. Verifique se o servidor está rodando.');
      } finally {
        isSubmitting.value = false;
      }
    }
  };
</script>

<template>
  <div class="registration-form">
    <span>
      Etapa
      <span class="registration-form__highlight">{{ stepIndex + 1 }}</span> de
      {{ stepsDisplayInfo.length }}
    </span>

    <span class="registration-form__title">
      {{ currentStepDisplayInfo.label }}
    </span>

    <div class="registration-form__content">
      <component :is="currentStepDisplayInfo.component" />
    </div>

    <div class="registration-form__actions">
      <MBButton
        v-if="stepIndex !== 0"
        :disabled="isSubmitting"
        variant="secondary"
        @click="stepIndex--"
      >
        Voltar
      </MBButton>
      <MBButton
        :disabled="
          (currentStepData && currentStepData.isValid === false) || isSubmitting
        "
        variant="primary"
        @click="submitData"
      >
        {{
          stepIndex === stepsDisplayInfo.length - 1 ? 'Cadastrar' : 'Continuar'
        }}
      </MBButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .registration-form {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    border-radius: 8px;
    padding: 24px;
    background-color: $background-overflow-color;
    border: 1px solid $border-light-color;

    &__highlight {
      color: $primary-color;
    }

    &__title {
      font-size: 24px;
      line-height: 42px;
      font-weight: 600;
    }

    &__content {
      margin-top: 18px;
    }

    &__actions {
      display: flex;
      justify-content: space-evenly;
      margin-top: 32px;
      gap: 8px;
    }
  }
</style>
