<template>
  <div class="login-container">
    <el-card shadow="never" class="w-full max-w-md login-card" :body-style="{ padding: 20 }">
      <h2 class="my-3">Log in</h2>

      <!-- Form -->
      <el-form ref="form" label-position="top" :model="data">
        <!-- Email input -->
        <el-form-item label="Email" prop="email">
          <el-input placeholder="Email" type="text" v-model="data.email" size="large" />
        </el-form-item>

        <!-- Password input -->
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="data.password" placeholder="Password" size="large" />
        </el-form-item>

        <!-- Don't have an account?-->
        <p>Don't have an account?<el-link type="primary">Sign up</el-link></p>

        <!-- Sign in-->
        <el-button type="primary" size="large" class="w-full" @click="signIn">Sign in</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

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
.login-card {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.forgot-password {
  margin-left: 10px;
}
</style>
