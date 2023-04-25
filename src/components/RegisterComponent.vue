<template>
  <div class="login-container">
    <el-card shadow="never" class="w-full max-w-md login-card" :body-style="{ padding: 20 }">
      <h2 class="my-3">Registrer bruker</h2>

      <!-- Form -->
      <el-form ref="form" label-position="top" :model="data" :rules="rules">
        <!-- Email input -->
        <el-form-item label="E-post" prop="Email">
          <el-input placeholder="E-post" type="text" v-model="data.email" size="large" />
        </el-form-item>

        <!-- Name input -->
        <el-form-item label="Fornavn" prop="firstname">
          <el-input placeholder="Fornavn" type="text" v-model="data.firstName" size="large" />
        </el-form-item>

        <!-- Password input -->
        <el-form-item label="Passord" prop="password">
          <el-input type="password" v-model="data.password" placeholder="Passord" size="large" />
        </el-form-item>

        <!-- Repeat password input -->
        <el-form-item label="Gjenta passord" prop="repeat">
          <el-input
            type="password"
            v-model="data.repeat"
            placeholder="Gjenta passord"
            size="large"
          />
        </el-form-item>

        <!-- Registrer input-->
        <el-button type="primary" size="large" class="w-full" @click="register"
          >Registrer</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormRules } from "element-plus";
import { ElForm } from "element-plus";
import { AccountApi } from "@/services/index";
import router from "@/router";

const accountApi = new AccountApi();

const data = reactive({
  email: "",
  password: "",
  repeat: "",
  firstName: "",
});

const rules: FormRules = reactive({
  email: [
    { required: true, trigger: "blur", message: "Fyll ut e-post" },
    { type: "email", message: "Vennligst oppgi en gyldig e-post." },
  ],
  password: [
    { required: true, trigger: "blur", message: "Fyll ut passord." },
    { min: 8, trigger: "change", message: "Passordet ditt er for kort!" },
  ],
  firstname: [
    { required: true, trigger: "blur", message: "Fyll ut fornavn." },
    { min: 1, trigger: "change", message: "Du må fylle ut et navn!" },
  ],
  repeat: [
    { required: true, trigger: "blur", message: "Gjenta passord." },
    { min: 8, trigger: "change", message: "Passordet ditt er for kort!" },
    {
      validator: (rule, value) => {
        if (value === data.password) {
          return true;
        } else {
          return new Error("Passordene er ikke like");
        }
      },
      trigger: "change",
    },
  ],
});

const form = ref<InstanceType<typeof ElForm> | null>();
// Define callbacks
function register() {
  if (form.value) {
    form.value.validate((valid) => {
      if (valid) {
        console.log("Velkommen");
      } else {
        console.log("Validation failed");
        return false;
      }
    });
  }

    accountApi.createUser({ email: data.email, password: data.password, firstName: data.firstName })
    .then(response => response.data)
        .then(data => {
            console.log(data);
            router.push({ "/login"});
        }
    .catch(error => showError("Kunne ikke logge inn.", error.message, 0));
    
}
</script>
<style scoped>
.login-card {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.forgot-password {
  margin-left: 10px;
}

.signup {
  justify-between: 20px;
}
</style>
