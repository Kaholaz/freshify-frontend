<template>
  <el-main id="component-name" class="component-name-wrapper">
    <h1>{{ householdStore.getHousehold()?.name }}</h1>
    <div class="top-bar">
      <HouseholdTopBar :newUserEmail="users" @delete-household="deleteHousehold()" />
    </div>
    <div>
      <el-row gutter="20">
        <el-col
          v-for="user in users"
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
  </el-main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { UserFull, Household } from "@/services";
import UserCard from "@/components/HouseholdCard.vue";
import HouseholdTopBar from "@/components/HouseholdTopBar.vue";
import { useHouseholdStore } from "@/stores/household";
import { useSessionStore } from "@/stores/session";
import { HouseholdApi } from "@/services/index";
import { ElMessage } from "element-plus";

const householdStore = useHouseholdStore();
const sessionStore = useSessionStore();
const householdApi = new HouseholdApi();

//test data
let users = ref([]);

//use household store
householdApi.getUsers(23).then((data) => {
  users.value = data.data;
  console.log("users: " + users.value);
});

function removeUser(user: UserFull) {
  return householdApi
    .removeUserFromHousehold(23, user.id!)
    .then((data) => {
      ElMessage.success("Fjernet " + user.firstName + " fra husholdning");
      users.value = users.value.filter((u) => u.user.id !== user.id);
      console.log("removed user: " + user.firstName + ", status: " + data.status);
    })
    .catch((error) => {
      ElMessage.error("Kunne ikke fjerne bruker fra husholdning" + error);
      console.log(error);
    });
}

function updateUserPrivelige(user: UserFull) {
  console.log(user.email);
  let userToUpdate = users.value.filter((u) => u.user.id === user.id)[0];
  console.log("userToUpdateType: " + userToUpdate.userType);
  if (userToUpdate.userType === "SUPERUSER") {
    userToUpdate.userType = "USER";
  } else {
    userToUpdate.userType = "SUPERUSER";
  }
  return householdApi
    .updateHouseholdMemberRole(23, userToUpdate?.id, userToUpdate.userType)
    .then((data) => {
      ElMessage.success("Oppdaterte bruker " + user.firstName + " til " + userToUpdate.userType);
      users.value = users.value.map((u) => {
        if (u.user.id === user.id && u.userType === "USER") {
          u.userType = "USER";
        } else if (u.user.id === user.id && u.userType === "SUPERUSER") {
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

/* 
function addUser(email: String) {
  console.log("added user: " + email);
}
 */
function deleteHousehold() {
  console.log("deleted household");
}

//test store
onMounted(() => {
  householdStore.setHousehold({
    id: 234,
    name: "Hjemme",
  } as Household);

  console.log("mounted");
});
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}

.top-bar {
  margin-bottom: 20px;
}
</style>
