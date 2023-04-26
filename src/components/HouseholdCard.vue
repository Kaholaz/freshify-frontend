<template>
  <el-card
    class="relative m-2 w-full max-w-xl overflow-visible"
    shadow="never"
    style="height: 11rem"
  >
    <h2 class="mb-5">{{ user.firstName }}</h2>
    <p class="text-[#868e96]">{{ userType === "SUPERUSER" ? "SUPERBRUKER" : "BRUKER" }}</p>
    <p class="text-[#868e96]">{{ user.email }}</p>
    <footer class="mt-2 text-right">
      <el-button
        v-if="
          userType == 'USER' && currentUser.id != user.id && currentUserPrivelige == 'SUPERUSER'
        "
        type="primary"
        @click="emit('updateUserPrivelige', user)"
      >
        Promoter bruker
      </el-button>
      <el-button
        v-else-if="currentUser.id != user.id && currentUserPrivelige == 'SUPERUSER'"
        type="primary"
        @click="emit('updateUserPrivelige', user)"
      >
        Degrader bruker
      </el-button>
      <el-button
        v-if="currentUser.id != user.id && currentUserPrivelige == 'SUPERUSER'"
        type="danger"
        @click="emit('removeUser', user)"
      >
        Fjern bruker
      </el-button>
    </footer>
  </el-card>
</template>

<script lang="ts" setup>
import type { UserFull } from "@/services";

const emit = defineEmits<{
  (event: "removeUser", args: UserFull): void;
  (event: "updateUserPrivelige", args: UserFull): void;
}>();

const props = defineProps<{
  user: UserFull;
  userType: String;
  currentUser: UserFull;
  currentUserPrivelige: string;
}>();
</script>

<style scoped></style>
