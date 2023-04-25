<template>
  <el-card shadow="never" class="w-full max-w-md login-card" :body-style="{ padding: 20 }">
    <div class="m-8 text-center">
      <el-link href="https://element-plus.org/en-US/" :underline="false" class="m-0">
        <img
          src="https://element-plus.org/images/element-plus-logo.svg"
          class="block w-[120px] h-[28px]"
          alt="Element Plus"
        />
      </el-link>
      <h2 class="my-3">Log in</h2>
      <p class="text-[#868e96]">
        Don't have an account?
        <el-link type="primary">Sign up</el-link>
      </p>
    </div>
    <el-form label-position="top">
      <el-form-item label="Email">
        <el-input placeholder = "Email" type="text" v-model="email" size="large" />
      </el-form-item>
      <el-form-item type="text" v-model="password" label="Password">
        <el-input placeholder = "Password" size="large" />
      </el-form-item>
      <div class="flex justify-between mb-2">
        <el-checkbox v-model="checked" label="Remember me" size="large" />
        <el-link class="forgot-password" type="primary">Forgot password?</el-link>
      </div>
      <el-button type="primary" size="large" class="w-full">Sign in</el-button>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { computed, reactive } from "vue";
import { required, email, minLength } from "@vuelidate/validators";
import useValidate from '@vuelidate/core';

  const state = reactive({
            email: '',
            password: {
                password: '',
                confirm: '',
            },
        })
        const rules = computed(() => {
            email: { required },
            password: {
                password: { required },
                confirm: { required },
            }
        })
       

const email = ref("");
const password = ref("");

const v$ = useValidate(rules)



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
