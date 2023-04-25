<template>
  <div class="login-container">
    <h2 class="my-3">Log in</h2>

    <!-- Form -->
    <el-form ref="form" label-position="top" :model="data" class="login-form">
      <!-- Email input -->
      <el-form-item label="Email" prop="email">
        <el-input placeholder="Email" type="text" v-model="data.email" size="large" />
      </el-form-item>

      <!-- Password input -->
      <el-form-item class="password-form-item" label="Password" prop="password">
        <el-input type="password" v-model="data.password" placeholder="Password" size="large" />
      </el-form-item>

      <!-- Ingen konto? -->
      <p class="no-account">
        Har du ikke konto?<el-link type="primary" @click="router.push({ name: 'register' })"
          >Regisrer deg!</el-link
        >
      </p>

      <!-- Sign in-->
      <el-button type="primary" size="large" class="w-full" @click="signIn">Sign in</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import router from "@/router";

const data = reactive({
  email: "",
  password: "",
});

// Define callbacks
function signIn() {
  console.log("Sign in");
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.login-form {
  max-width: 350px;
  width: 80%;
}

.no-account {
  margin: 0;
  text-align: end;
}

.no-account > a {
  margin-left: 5px;
}

.password-form-item {
  margin-bottom: 0;
}
</style>
