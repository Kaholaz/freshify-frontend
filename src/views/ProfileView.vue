<template>
	<EditProfile @change:user="updateUser" @change:password="updatePassword" />
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ElMessage } from "element-plus";

import type { UpdateUser } from "@/services/index";
import { AccountApi } from "@/services/index";
import { showError } from "@/utils/error-utils";

import EditProfile from "@/components/EditProfile.vue";

// Define APIs and stores
const accountApi = new AccountApi();

// Define refs
const updatedUser: UpdateUser = reactive({
	firstName: "",
	email: "",
	password: "",
});

// Define callback functions
function updateUser(firstName: string, email: string) {
	updatedUser.firstName = firstName;
	updatedUser.email = email;
	sendUpdate();
}

function updatePassword(password: string) {
	updatedUser.password = password;
	sendUpdate();
}

// Other script logic
function sendUpdate() {
	accountApi
		.updateUser(updatedUser)
		.then(() => {
			console.info("User updated.");
			ElMessage({
				message: "Brukeren din ble oppdatert.",
				type: "success",
			});
		})
		.catch(err => {
			console.error(err);
			showError("Noe gikk galt under lagring.", err.message);
		});
}

</script>

<style scoped>
</style>