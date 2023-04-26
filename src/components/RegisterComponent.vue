<template>
  <h2 class="my-3">Registrer deg</h2>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    :model="newUser"
    :rules="validationRules"
    status-icon
  >
    <el-form-item label="Email" prop="email">
      <el-input placeholder="Email" type="text" v-model="email" size="large" />
    </el-form-item>

    <el-form-item label="Fornavn" prop="firstName">
      <el-input placeholder="fornavn" type="text" v-model="firstName" size="large" />
    </el-form-item>

    <el-form-item label="Passord" prop="password">
      <el-input type="password" v-model="password" placeholder="Password" size="large" />
    </el-form-item>

    <el-form-item label="Gjenta passord" prop="passwordConfirm">
      <el-input type="password" v-model="passwordConfirm" placeholder="Password" size="large" />
    </el-form-item>

    <el-button ref="submitButton" type="primary" size="large" @click="submit"
      >Registrer deg
    </el-button>
  </el-form>
  <el-alert
    type="error"
    show-icon
    :title="errorMessage"
    v-if="errorMessage"
    style="margin-top: 1rem"
  />
</template>
<script setup lang="ts">
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
  "update:firstName": (firstName: string) => void;
  "update:password": (password: string) => void;
  "update:email": (email: string) => void;
  submit: () => void;
}>();

const passwordConfirm = ref<string>("");

const validationRules = ref({
  firstName: [
    { required: true, message: "Fornavn er påkrevd", trigger: "blur" },
    { min: 2, message: "Fornavn må være minst 2 tegn", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Email er påkrevd", trigger: "blur" },
    { type: "email", message: "Email må være en gyldig email", trigger: "blur" },
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
