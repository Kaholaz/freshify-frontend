<template>
  <el-card
    :class="{ me: householdMember.user?.id === sessionStore.getUser()?.id }"
    class="relative m-2 w-full max-w-xl overflow-visible"
    shadow="never"
    style="height: 11rem"
  >
    <h2 class="mb-5">{{ householdMember.user?.firstName }}</h2>
    <el-tag
      :type="householdMember.userType === HouseholdUserType.SUPERUSER ? 'success' : 'info'"
      class="ml-2"
    >
      {{ householdMember.userType === HouseholdUserType.SUPERUSER ? "SUPERBRUKER" : "BRUKER" }}
    </el-tag>
    <p class="text-[#868e96]">{{ householdMember.user?.email }}</p>
    <footer
      v-if="householdStore.isSuperuser() && sessionStore.getUser()?.id !== householdMember.user?.id"
      class="mt-2 text-right"
    >
      <el-button type="primary" @click="emitUpdateUserPrivilege()">
        <span v-if="householdMember.userType === HouseholdUserType.USER">Promoter bruker</span>
        <span v-else>Degrader bruker</span>
      </el-button>
      <el-button type="danger" @click="emitRemoveUser"> Fjern bruker</el-button>
    </footer>
  </el-card>
</template>

<script lang="ts" setup>
import { HouseholdUserType, UserFull } from "@/services/index";
import { useSessionStore } from "@/stores/session";
import { useHouseholdStore } from "@/stores/household";

const sessionStore = useSessionStore();
const householdStore = useHouseholdStore();

type HouseholdMember = { user?: UserFull; userType?: HouseholdUserType };

function emitUpdateUserPrivilege() {
  if (!props.householdMember.user) return;
  emit("updateUserPrivilege", props.householdMember);
}

function emitRemoveUser() {
  if (!props.householdMember.user) return;
  emit("removeUser", props.householdMember);
}

const emit = defineEmits<{
  (event: "removeUser", args: HouseholdMember): void;
  (event: "updateUserPrivilege", args: HouseholdMember): void;
}>();

const props = defineProps<{
  householdMember: HouseholdMember;
}>();
</script>

<style scoped>
.me {
  border: 2px solid var(--el-color-primary);
}
</style>