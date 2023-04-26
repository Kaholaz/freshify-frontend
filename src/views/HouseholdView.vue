<template>
  <h1 v-if="householdStore.household?.id">{{ householdStore.household.name }}</h1>
  <el-alert v-else center>Velg eller lag en ny husholdning for å redigere den</el-alert>
  <div class="top-bar" v-if="householdStore.household?.id">
    <HouseholdTopBar
      :current-user-privelige="currentUserPrivelige"
      @delete-household="deleteHousehold()"
      @add-user="addUser"
    />
  </div>
  <div>
    <el-row :gutter="10" style="width: 100%; margin: 0">
      <el-col
        v-for="user in users.sort((a, b) => a.userType.localeCompare(b.userType))"
        :key="user.user.id"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="12"
        :xl="12"
      >
        <UserCard
          :user="user.user"
          :user-type="user.userType"
          :current-user="currentUser!"
          :current-user-privelige="currentUserPrivelige"
          @remove-user="removeUser(user.user)"
          @update-user-privelige="updateUserPrivelige(user.user)"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import type { HouseholdUserType, UpdateHouseholdUserType, UserFull } from "@/services";
import UserCard from "@/components/HouseholdCard.vue";
import HouseholdTopBar from "@/components/HouseholdTopBar.vue";
import { useHouseholdStore } from "@/stores/household";
import { useSessionStore } from "@/stores/session";
import { AccountApi, HouseholdApi } from "@/services/index";
import { ElMessage } from "element-plus";

const householdStore = useHouseholdStore();
const sessionStore = useSessionStore();
const householdApi = new HouseholdApi();
const accountApi = new AccountApi();

let users = ref([]);
const emitter = inject("emitter");
const currentUser = sessionStore.getUser();

const currentUserPrivelige = computed(() => {
  if (householdStore.household?.id) {
    return users.value.filter((u) => u.user.id === currentUser.id)[0].userType as string;
  } else {
    return "";
  }
});

emitter.on("household-updated", () => {
  getUsers();
});

getUsers();

function getUsers() {
  if (householdStore.household?.id) {
    householdApi.getUsers(householdStore.household?.id!).then((data) => {
      users.value = data.data;
    });
  }
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
  let userId = undefined as number;
  await accountApi
    .getUserByEmail(value)
    .then((data) => {
      console.log("data from emailApi:" + data.data.userId);
      console.log(data.status);
      console.log(data.data.userId);
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
</style>
