<template>
  <div id="householdview" class="householdview-wrapper">
    <h1 v-if="householdStore.household?.id">{{ householdStore.household?.name }}</h1>
    <h1 v-else>Velg husholdning i meny</h1>
    <div class="top-bar" v-if="householdStore.household?.id">
      <HouseholdTopBar @delete-household="deleteHousehold()" @add-user="addUser" />
    </div>
    <div>
      <el-row gutter="20">
        <el-col
          v-for="user in users.sort((a, b) => a.userType.localeCompare(b.userType))"
          :key="user.user.id"
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="16"
          class="mb-5"
        >
          <UserCard
            :user="user.user"
            :user-type="user.userType"
            @remove-user="removeUser(user.user)"
            @update-user-privelige="updateUserPrivelige(user.user)"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import type { HouseholdUserType, UserFull } from "@/services";
import UserCard from "@/components/HouseholdCard.vue";
import HouseholdTopBar from "@/components/HouseholdTopBar.vue";
import { useHouseholdStore } from "@/stores/household";
import { useSessionStore } from "@/stores/session";
import { HouseholdApi, AccountApi } from "@/services/index";
import { ElMessage } from "element-plus";
import {UpdateHouseholdUserType} from "@/services";

const householdStore = useHouseholdStore();
/* const sessionStore = useSessionStore(); */
const householdApi = new HouseholdApi();
const accountApi = new AccountApi();

let users = ref([]);
const emitter = inject("emitter");

emitter.on("household-updated", () => {
  getUsers();
});

getUsers();

function getUsers() {
  householdApi.getUsers(householdStore.household?.id!).then((data) => {
    users.value = data.data;
  });
}

function removeUser(user: UserFull) {
  return householdApi
    .removeUserFromHousehold(householdStore.household?.id!, user.id!)
    .then(() => {
      ElMessage.success("Fjernet " + user.firstName + " fra husholdning");
      users.value = users.value.filter((u) => u.user.id !== user.id);
      console.log("removed user: " + user.firstName);
    })
    .catch((error) => {
      ElMessage.error("Kunne ikke fjerne bruker fra husholdning" + error);
      console.log(error);
    });
}

function updateUserPrivelige(user: UserFull) {
  console.log(user.email);
  let userToUpdate = users.value.filter((u) => u.user.id === user.id)[0];
  let updatePriveliges = "" as string;
  console.log("userToUpdateType: " + userToUpdate.userType);
  if (userToUpdate.userType === "SUPERUSER") {
    updatePriveliges = "USER";
  } else {
    updatePriveliges = "SUPERUSER";
  }

  let updateHouseholdUserType: UpdateHouseholdUserType = {
    userId: userToUpdate.user.id,
    type: updatePriveliges as HouseholdUserType,
  };

  return householdApi
    .updateHouseholdMemberRole(householdStore.household?.id!, updateHouseholdUserType)
    .then((data) => {
      ElMessage.success("Oppdaterte bruker " + user.firstName + " til: " + userToUpdate.userType);
      let updatedPriveliges = "" as string;
      users.value = users.value.map((u) => {
        if (u.user.id === user.id && updatePriveliges === "USER") {
          u.userType = "USER";
        } else if (u.user.id === user.id && updatePriveliges === "SUPERUSER") {
          u.userType = "SUPERUSER";
        }
        return u;
      });
      console.log(
        "updated user: " +
          user.firstName +
          ", status: " +
          data.status +
          " to " +
          userToUpdate.userType
      );
    })
    .catch((error) => {
      ElMessage.error("Kunne ikke oppdatere bruker" + error);
      console.log(error);
    });
}

async function addUser(value: string) {
  console.log("add user: " + value);
  //todo: fix this
  let userId: number = -1;
  await accountApi
    .getUserByEmail(value)
    .then((data) => {
      console.log("data from emailApi:" + data.data.userId);
      console.log(data.status)
      console.log(data.data.userId)
      if (data.data.userId) {
        userId = data.data.userId;
      }
    })
    .catch((error) => {
      ElMessage.error("Kunne ikke finne bruker med epost: " + value);
      console.log(error);
    });
  return await householdApi
    .addUser(householdStore.household?.id!, { userId })
    .then((data) => {
      ElMessage.success("La til " + value + " i husholdning");
      addUserLocally(userId);
      console.log("added user: " + value + ", status: " + data.status);
    })
    .catch((error) => {
      ElMessage.error("Kunne ikke finne bruker med epost: " + value);
      console.log(error);
    });
}

function addUserLocally(id: number) {
  console.log("add user locally: " + id);
  return householdApi
    .getUsers(householdStore.household?.id!)
    .then((data) => {
      users.value = data.data;
      console.log("added user: " + data.data.firstName);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteHousehold() {
  householdApi
    .deleteHousehold(householdStore.household?.id!)
    .then(() => {
      users.value = [];
      ElMessage.success("Slettet husholdning");
      console.log("deleted household: " + householdStore.household?.name);
      householdStore.removeHousehold();
    })
    .catch((error) => {
      ElMessage.error("Kunne ikke slette husholdning" + error);
      console.log(error);
    });
  console.log("deleted household");
}

onMounted(() => {});
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}

.top-bar {
  margin-bottom: 20px;
}

.householdview-wrapper {
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
  margin: 0;
  overflow: hidden;
}
</style>
