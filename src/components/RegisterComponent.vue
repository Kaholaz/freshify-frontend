<template>
  <h2 class="my-3" style="margin-bottom: 10px">Registrer deg</h2>
  <el-form
    ref="ruleFormRef"
    :model="newUser"
    :rules="validationRules"
    label-position="top"
    status-icon
    @submit.prevent
  >
    <el-form-item label="E-post" prop="email">
      <el-input v-model="email" placeholder="E-post" size="large" type="text" id="email-input" />
    </el-form-item>

    <el-form-item label="Fornavn" prop="firstName">
      <el-input
        v-model="firstName"
        placeholder="Fornavn"
        size="large"
        type="text"
        id="first-name-input"
      />
    </el-form-item>

    <el-form-item label="Passord" prop="password">
      <el-input
        v-model="password"
        placeholder="Passord"
        size="large"
        type="password"
        id="password-input"
      />
    </el-form-item>

    <el-form-item label="Gjenta passord" prop="passwordConfirm">
      <el-input
        v-model="passwordConfirm"
        placeholder="Passord"
        size="large"
        type="password"
        @keyup.enter="submit"
        id="password-confirm-input"
      />
    </el-form-item>

    <el-button ref="submitButton" size="large" type="primary" @click="submit"
      >Registrer deg
    </el-button>
  </el-form>
  <el-alert
    v-if="errorMessage"
    :title="errorMessage"
    show-icon
    style="margin-top: 1rem"
    type="error"
  />
</template>
<script lang="ts" setup>
import type { CreateUser } from "@/services";
import { computed, ref } from "vue";
import type { FormInstance } from "element-plus";

const ruleFormRef = ref<FormInstance>();
const props = defineProps<{
  firstName: string;
  password: string;
  email: string;
  errorMessage: string;
}>();

const emit = defineEmits<{
  (event: "update:firstName", firstName: string): void;
  (event: "update:password", password: string): void;
  (event: "update:email", email: string): void;
  (event: "submit"): void;
}>();

const passwordConfirm = ref<string>("");

const validationRules = ref({
  firstName: [
    { required: true, message: "Fornavn er påkrevd", trigger: "blur" },
    { min: 2, message: "Fornavn må være minst 2 tegn", trigger: "blur" },
  ],
  email: [
    { required: true, message: "E-post er påkrevd", trigger: "blur" },
    { type: "email", message: "E-post må være en gyldig e-post", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Passord er påkrevd", trigger: "blur" },
    { min: 8, message: "Passord må være minst 8 tegn", trigger: "blur" },
  ],
  passwordConfirm: [
    { required: true, message: "Gjenta passordet", trigger: "blur" },
    { min: 8, message: "Passord må være minst 8 tegn", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== password.value) {
          callback(new Error("Passordene må være like"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

const firstName = computed({
  get: () => props.firstName,
  set: (value: string) => emit("update:firstName", value),
});

const password = computed({
  get: () => props.password,
  set: (value: string) => emit("update:password", value),
});

const email = computed({
  get: () => props.email,
  set: (value: string) => emit("update:email", value),
});

const newUser = computed(() => {
  return {
    firstName: props.firstName,
    password: props.password,
    email: props.email,
    passwordConfirm: passwordConfirm.value,
  } as CreateUser;
});

function submit() {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      emit("submit");
    }
  });
}
</script>
<style scoped></style>
