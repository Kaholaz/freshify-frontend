<template>
	<EditProfile v-model="updatedUser" />
</template>

<script setup lang="ts">
import { reactive } from "vue";

import type { UpdateUser } from "@/services/index";
import { AccountApi } from "@/services/index";

import EditProfile from "@/components/EditProfile.vue";

// Define APIs and stores
const accountApi = new AccountApi();

// Define refs
const updatedUser: UpdateUser = reactive({
	firstName: "",
	email: "",
	password: "",
});

// Define computed values

// Define callback functions

// Other script logic

</script>

<style scoped>
.profile-wrapper {
  
}
</style>