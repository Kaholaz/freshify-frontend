<template>
  <el-card id="edit-profile" class="edit-profile-wrapper">
    <h1>Rediger profil</h1>
    <div class="change-label">
      <h3>Sett nytt navn og/eller email</h3>
    </div>
    <!-- Username and email form -->
    <el-form
      ref="userFormData"
      label-position="top"
      :model="userData"
      :rules="rules"
      status-icon
    >
      <!-- First name input -->
      <el-form-item prop="firstName" label="Fornavn">
        <el-input v-model="userData.firstName" />
      </el-form-item>

      <!-- Email input -->
      <el-form-item prop="email" label="E-post">
        <el-input v-model="userData.email"/>
      </el-form-item>

      <!-- Submit button -->
      <el-button 
        type="primary" 
        @click="submitUser"
      >Lagre</el-button>
    </el-form>

    <el-divider />
  
    <div class="change-password-label">
      <h3>Sett passord</h3>
      <el-button 
        id="toggle-edit-password-button"
        :type="passwordEditable ? 'danger' : 'success'"
        @click="passwordEditable = !passwordEditable;">
        {{ passwordEditable ? "Skjul": "Vis" }}
      </el-button>
    </div>
  
    <!-- Password repeat form -->
    <el-form
      ref="passwordFormData"
      label-position="top"
      :model="passwordData"
      :rules="passwordRules"
      status-icon
      :style="{
        height: passwordEditable ? '200px' : 0,
        overflow: 'hidden',
      }"
    >
      <el-form-item prop="password" label="Passord">
        <el-input v-model="passwordData.password" type="password"/>
      </el-form-item>
  
      <el-form-item prop="passwordConfirm" label="Gjenta passord">
        <el-input v-model="passwordData.passwordConfirm" type="password"/>
      </el-form-item>
  
      <el-button type="primary" @click="submitPassword">Sett nytt passord</el-button>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { FormInstance } from "element-plus";

import { useSessionStore } from "@/stores/session";

// Define APIs and store
const sessionStore = useSessionStore();

// Define emits
const emit = defineEmits<{
  (event: "change:user", firstName: string, email: string) : void;
  (event: "change:password", password: string) : void;
}>();

// Define refs
const passwordEditable = ref(false);

const userFormData = ref<FormInstance>();
const userData = ref<{ firstName: string; email: string }>({
  firstName: "",
  email: "",
});


const passwordFormData = ref<FormInstance>();
const passwordData = ref<{ password: string; passwordConfirm: string }>({
  password: "",
  passwordConfirm: "",
});

const rules = ref({
  firstName: [
    { required: true, message: "Fornavn er påkrevd", trigger: "blur" },
    { min: 2, message: "Fornavn må være minst 2 tegn", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Email er påkrevd", trigger: "blur" },
    { type: "email", message: "Email må være en gyldig email", trigger: "blur" },
  ]
});

const passwordRules = ref({
  password: [
    { required: true, message: "Passord er påkrevd", trigger: "blur" },
    { min: 8, message: "Passord må være minst 8 tegn", trigger: "blur" },
  ],
  passwordConfirm: [
    { required: true, message: "Gjenta passordet", trigger: "blur" },
    { min: 8, message: "Passord må være minst 8 tegn", trigger: "blur" },
    { validator: validatePasswordConfirm, trigger: "change" },
  ]
});

// Define callback functions
function validatePasswordConfirm() {
  if (passwordData.value.password !== passwordData.value.passwordConfirm) {
    return Promise.reject("Passordene må være like!");
  } else {
    return Promise.resolve();
  }
}

async function submitUser() {
  let valid = await userFormData.value?.validate();
  if (valid) {
    emit("change:user", userData.value.firstName, userData.value.email);
  }
}

async function submitPassword() {
  let valid = await passwordFormData.value?.validate();
  if (valid) {
    emit("change:password", passwordData.value.password);
  }
}

// Other script logic
// pre-fill the form with the current user data
userData.value.firstName = sessionStore.getUser()?.firstName || "";
userData.value.email = sessionStore.getUser()?.email || "";

</script>

<style scoped>
.edit-profile-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
}

.edit-profile-wrapper * {
  transition-duration: 200ms;
}

.edit-profile-wrapper h1 {
  margin-bottom: 50px;
  align-self: center;
}

.change-password-label {
  display: flex;
}

#toggle-edit-password-button {
  box-sizing: content-box;
  padding: .3rem .4rem;
  height: 14px;
  font-size: 14px;
  align-self: center;
  margin-left: .5rem;
}
</style>