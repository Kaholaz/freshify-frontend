<template>
  <el-dialog
    v-model="dialogVisible"
    style="max-width: 350px"
    title="Du må godta vilkårene for å registrere deg som bruker"
  >
    <p class="tostext">
      Du kan lese vilkårene her:
      <a href="/tos" target="_blank"> vilkår og betingelser</a>
    </p>
    <div>
      <el-button id="accept-tos" type="success" @click="acceptTerms">Ok</el-button>
      <el-button type="danger" @click="exitTerms">Avbryt</el-button>
    </div>
  </el-dialog>
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
  <div class="privacyButton">
    <router-link target="_blank" to="/privacy">
      <el-button>Personvernserklæring</el-button>
    </router-link>
  </div>
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
const householdStore = useHouseholdStore();

const active = ref(0);
const dialogVisible = ref(false);
const acceptedTerms = ref(false);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};

function submit() {
  if (!acceptedTerms.value) {
    dialogVisible.value = true;
    return;
  }
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

function acceptTerms() {
  acceptedTerms.value = true;
  dialogVisible.value = false;
  submit();
}

function exitTerms() {
  dialogVisible.value = false;
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
      householdStore.household = data.data;
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

.tostext {
  margin-bottom: 20px;
}

.privacyButton {
  text-align: center;
}
</style>
