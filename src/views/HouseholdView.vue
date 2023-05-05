<template>
  <h1 v-if="householdStore.household?.id">{{ householdStore.household.name }}</h1>
  <el-alert v-else center>Velg eller lag en ny husholdning for å redigere den</el-alert>
  <div v-if="householdStore.household?.id" class="top-bar">
    <HouseholdTopBar @delete-household="deleteHousehold()" @add-user="addUser" />
  </div>
  <div>
    <el-row :gutter="10" style="width: 100%; margin: 0">
      <el-col
        v-for="householdMember in householdMembers.sort((a, b) =>
          a.userType?.toString().localeCompare(b.userType?.toString())
        )"
        :key="householdMember.user?.id"
        :lg="12"
        :md="24"
        :sm="24"
        :xl="12"
        :xs="24"
      >
        <UserCard
          :household-member="householdMember"
          @remove-user="removeUser(householdMember)"
          @update-user-privilege="updateUserPrivilege(householdMember)"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, onUnmounted, ref } from "vue";
import type { UpdateHouseholdUserType, UserFull } from "@/services/index";
import { HouseholdUserType } from "@/services/index";
import UserCard from "@/components/HouseholdCard.vue";
import HouseholdTopBar from "@/components/HouseholdTopBar.vue";
import { useHouseholdStore } from "@/stores/household";
import { AccountApi, HouseholdApi } from "@/services/index";
import { ElMessage } from "element-plus";

const householdStore = useHouseholdStore();
const householdApi = new HouseholdApi();
const accountApi = new AccountApi();

type HouseholdMember = { user?: UserFull; userType?: HouseholdUserType };
const householdMembers = ref([] as HouseholdMember[]);

// Update users when household is updated
const emitter = inject("emitter");
onMounted(() => {
  getUsers();
  emitter.on("household-updated", getUsers);
});

onUnmounted(() => {
  emitter.off("household-updated", getUsers);
});

function getUsers() {
  if (householdStore.household?.id) {
    householdApi.getUsers(householdStore.household?.id!).then((data) => {
      householdMembers.value = data.data;
    });
  }
}

function removeUser(user: HouseholdMember) {
  return householdApi
    .removeUserFromHousehold(householdStore.household?.id!, user.user?.id!)
    .then(() => {
      ElMessage.success("Fjernet " + user.user?.firstName + " fra husholdning");
      householdMembers.value = householdMembers.value.filter((u) => u.user?.id !== user.user?.id);
    })
    .catch((error) => {
      ElMessage.error("Kunne ikke fjerne bruker fra husholdning: " + error);
    });
}

function updateUserPrivilege(householdMember: HouseholdMember) {
  console.log(householdMember);
  if (!householdMember.user) return;
  if (!householdMember.userType) return;
  console.log(householdMember);

  let updatePrivileges =
    householdMember.userType === HouseholdUserType.USER
      ? HouseholdUserType.SUPERUSER
      : HouseholdUserType.USER;
  let updateHouseholdUserType: UpdateHouseholdUserType = {
    userId: householdMember.user.id,
    type: updatePrivileges,
  };

  return householdApi
    .updateHouseholdMemberRole(householdStore.household?.id!, updateHouseholdUserType)
    .then(() => {
      ElMessage.success(
        "Oppdaterte bruker " +
          householdMember.user!.firstName +
          " til: " +
          (updatePrivileges === "USER" ? "Bruker" : "Superbruker")
      );
      householdMembers.value = householdMembers.value.map((u) => {
        if (u?.user?.id === householdMember.user?.id) u.userType = updatePrivileges;
        return u;
      });
    })
    .catch((error) => {
      ElMessage.error("Kunne ikke oppdatere bruker: " + error);
    });
}

async function addUser(email: string) {
  // Get user ID
  let userId: number;
  try {
    const data = await accountApi.getUserByEmail(email);
    if (!data.data.userId) throw new Error();
    userId = data.data.userId;
  } catch {
    ElMessage.error("Kunne ikke finne bruker med epost: " + email);
    return;
  }

  // Add user to household
  try {
    await householdApi.addUser(householdStore.household?.id!, { userId });
    ElMessage.success(email + " ble lagt til i husholdningen");
    getUsers();
  } catch {
    ElMessage.error("Kunne ikke legge til bruker med epost: " + email);
  }
}
function deleteHousehold() {
  if (!householdStore.household?.id) return ElMessage.error("Kunne ikke slette husholdning");
  householdApi
    .deleteHousehold(householdStore.household?.id!)
    .then(() => {
      householdMembers.value = [];
      householdStore.removeHousehold();
      ElMessage.success("Slettet husholdning");
    })
    .catch((error) => {
      ElMessage.error("Kunne ikke slette husholdning: " + error);
    });
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}

.top-bar {
  margin-bottom: 20px;
}
</style>
