<template>
  <el-steps
    :active="active"
    align-center
    finish-status="success"
    style="width: 90%; max-width: 600px; margin: auto"
  >
    <el-step title="Lag bruker"></el-step>
    <el-step title="Lag husholdning"></el-step>
  </el-steps>
  <el-card class="container">
    <RegisterComponent
      v-if="active == 0"
      v-model:email="user.email"
      v-model:first-name="user.firstName"
      v-model:password="user.password"
      :error-message="errorMessage"
      @submit="submit"
    >
    </RegisterComponent>
    <CreateHouseholdComponent
      v-if="active == 1"
      v-model:household-name="household.name"
      @skip="skipCreateHousehold"
      @submit="createHousehold"
    ></CreateHouseholdComponent>
  </el-card>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import type { CreateHousehold, CreateUser } from "@/services/index";
import { AccountApi, HouseholdApi } from "@/services/index";
import { useSessionStore } from "@/stores/session";
import router from "@/router";
import { useHouseholdStore } from "@/stores/household";
import CreateHouseholdComponent from "@/components/CreateHouseholdComponent.vue";

const user = reactive({
  email: "",
  password: "",
  firstName: "",
} as CreateUser);

const accountApi = new AccountApi();
const sessionStore = useSessionStore();
const errorMessage = ref<string>("");

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};

function submit() {
  accountApi
    .createUser(user)
    .then((data) => {
      sessionStore.authenticate(data.data);
      next();
    })
    .catch((error) => {
      if (error.response.status === 409) {
        errorMessage.value = "En bruker med denne eposten eksisterer allerede";
      } else {
        errorMessage.value = "En uventet feil oppstod";
      }
      setTimeout(() => {
        errorMessage.value = "";
      }, 5000);
    });
}

const household = reactive({
  name: "",
} as CreateHousehold);
const householdApi = new HouseholdApi();

function skipCreateHousehold() {
  next();
  router.push({ name: "inventory" });
}

function createHousehold() {
  householdApi
    .createHousehold(household)
    .then((data) => {
      useHouseholdStore().household = data.data;
      next();
      router.push({ name: "inventory" });
    })
    .catch((error) => {
      if (error.response.status === 409) {
        errorMessage.value = "Denne husholdningen eksisterer allerede";
      } else {
        errorMessage.value = "En uventet feil oppstod";
      }
      setTimeout(() => {
        errorMessage.value = "";
      }, 5000);
    });
}
</script>
<style>
.container {
  width: 90%;
  margin: 10vh auto;
  max-width: 500px;
}
</style>
