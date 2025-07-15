<script setup>
  import MBInput from '@/components/input/MBInput.vue';
  import { useRegistration } from '@/hooks/registration';
  import { onMounted, ref } from 'vue';

  const emit = defineEmits(['validation']);

  const { registrationDTO, setStepData } = useRegistration();

  const name = ref('');
  const cpf = ref('');
  const birthDate = ref('');
  const phone = ref('');

  const companyName = ref('');
  const cnpj = ref('');
  const establishmentDate = ref('');
  const phoneJuridico = ref('');

  const validateForm = () => {
    let isValid = false;
    let data = {};

    if (registrationDTO.value.userType === 'fisica') {
      isValid =
        name.value.length > 0 &&
        cpf.value.length >= 14 &&
        birthDate.value.length > 0 &&
        phone.value.length >= 14;

      data = {
        ...data,
        name: name.value,
        cpf: cpf.value,
        birthDate: birthDate.value,
        phone: phone.value,
      };
    } else {
      isValid =
        companyName.value.length > 0 &&
        cnpj.value.length >= 18 &&
        establishmentDate.value.length > 0 &&
        phoneJuridico.value.length >= 14;
      data = {
        ...data,
        companyName: companyName.value,
        cnpj: cnpj.value,
        establishmentDate: establishmentDate.value,
        phone: phoneJuridico.value,
      };
    }

    setStepData({
      step: 1,
      isValid,
      data,
    });

    emit('validation', { isValid, data });
  };

  const syncLocalData = () => {
    name.value = registrationDTO.value.name || '';
    cpf.value = registrationDTO.value.cpf || '';
    birthDate.value = registrationDTO.value.birthDate || '';
    phone.value = registrationDTO.value.phone || '';

    companyName.value = registrationDTO.value.companyName || '';
    cnpj.value = registrationDTO.value.cnpj || '';
    establishmentDate.value = registrationDTO.value.establishmentDate || '';
    phoneJuridico.value = registrationDTO.value.phone || '';
  };

  onMounted(() => {
    syncLocalData();
    validateForm();
  });
</script>

<template>
  <div class="registration-data-step">
    <div
      v-if="registrationDTO.userType === 'fisica'"
      class="registration-data-step__fields"
    >
      <MBInput
        v-model="name"
        @input="validateForm"
        id="name"
        type="text"
        label="Nome"
      />

      <MBInput
        v-model="cpf"
        v-mask="'###.###.###-##'"
        @input="validateForm"
        id="cpf"
        type="text"
        label="CPF"
      />

      <MBInput
        v-model="birthDate"
        @input="validateForm"
        id="birthDate"
        type="date"
        label="Data de nascimento"
      />

      <MBInput
        v-model="phone"
        v-mask="'(##) #####-####'"
        @input="validateForm"
        id="phone"
        type="text"
        label="Telefone"
      />
    </div>

    <div v-else class="registration-data-step__fields">
      <MBInput
        v-model="companyName"
        @input="validateForm"
        id="companyName"
        type="text"
        label="Razão social"
      />

      <MBInput
        v-model="cnpj"
        v-mask="'##.###.###/####-##'"
        @input="validateForm"
        id="cnpj"
        type="text"
        label="CNPJ"
      />

      <MBInput
        v-model="establishmentDate"
        @input="validateForm"
        id="establishmentDate"
        type="date"
        label="Data de abertura"
      />

      <MBInput
        v-model="phoneJuridico"
        v-mask="'(##) #####-####'"
        @input="validateForm"
        id="phoneJuridico"
        type="text"
        label="Telefone"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .registration-data-step {
    display: flex;
    flex-direction: column;
    background-color: $background-overflow-color;
    border-radius: 8px;
    gap: 16px;

    &__type {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 16px 0;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    &__fields {
      display: flex;
      flex-direction: column;
      gap: 16px;
      animation: fadeIn 0.3s ease-in-out;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
