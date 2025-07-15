import { ref } from 'vue';

const stepIndex = ref(0);
const stepDataByIndex = ref({});
const registrationDTO = ref({
  email: '',
  userType: '',
  name: '',
  companyName: '',
  cnpj: '',
  cpf: '',
  phone: '',
  password: '',
  birthDate: '',
  establishmentDate: '',
});

const setStepIndex = newStep => {
  stepIndex.value = newStep;
};

const setStepData = payload => {
  stepDataByIndex.value = {
    ...stepDataByIndex.value,
    [stepIndex.value]: payload,
  };
};

const setRegistrationData = data => {
  registrationDTO.value = {
    ...registrationDTO.value,
    ...data,
  };
};

export function useRegistration() {
  return {
    stepIndex,
    registrationDTO,
    stepDataByIndex,
    setStepData,
    setRegistrationData,
    setStepIndex,
  };
}
