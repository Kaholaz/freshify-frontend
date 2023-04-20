<template>
  <main id="LoginComponent" class="component-name-wrapper">
     <el-card shadow="never" class="w-full max-w-md" :body-style="{ padding: 20 }">
    <div class="m-8 text-center">
      <el-link
        href="https://element-plus.org/en-US/"
        :underline="false"
        class="m-0"
      >
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
        <el-input size="large" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input size="large" />
      </el-form-item>
      <div class="flex justify-between mb-2">
        <el-checkbox v-model="checked" label="Remember me" size="large" />
        <el-link type="primary">Forgot password?</el-link>
      </div>
      <el-button type="primary" size="large" class="w-full">Sign in</el-button>
    </el-form>
  </el-card>
  </main>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref, computed, onMounted } from "vue";

// Define APIs and stores
const userApi = new UserApi();
const userStore = useUserStore();
const checked = ref(false)

// Define refs
const value = ref(null) as Ref<HTMLElement | null>;

// Define computed values
const computedValue = computed(() => {
  
});

// Define callback functions
function onClick() {
  
};

// Vue hooks
onMounted(() => {
  
});

// Other script logic

</script>

<style scoped>
.component-name-wrapper {
  
}
</style>