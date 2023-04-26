<template>
  <el-card
    shadow="never"
    :body-style="{
      padding: '30px',
      overflow: 'hidden',
    }"
    class="relative m-2 w-full max-w-xl overflow-visible"
  >
    <h2 class="mb-5">{{ user.firstName }}</h2>
    <p class="text-[#868e96]">{{ userType }}</p>
    <p class="text-[#868e96]">{{ user.email }}</p>
    <div class="absolute -top-10 right-5">
      <el-icon color="black" size="80">
        <UserFilled />
      </el-icon>
    </div>
    <footer class="mt-2 text-right">
      <el-button
        v-if="
          userType == 'USER' && currentUser.id != user.id && currentUserPrivelige == 'SUPERUSER'
        "
        type="primary"
        @click="emit('updateUserPrivelige', user)"
      >
        Utnevn til superbruker
      </el-button>
      <el-button
        v-else-if="currentUser.id != user.id && currentUserPrivelige == 'SUPERUSER'"
        type="primary"
        @click="emit('updateUserPrivelige', user)"
      >
        Degrader til bruker
      </el-button>
      <el-button
        v-if="currentUser.id != user.id && currentUserPrivelige == 'SUPERUSER'"
        type="danger"
        @click="emit('removeUser', user)"
      >
        Fjern bruker fra husholdning
      </el-button>
    </footer>
  </el-card>
</template>

<script setup lang="ts">
import type { UserFull } from "@/services";
import { UserFilled } from "@element-plus/icons-vue";
import { useSessionStore } from "@/stores/session";

const sessionStore = useSessionStore();

//make use of sessionstore (remove) prop
/* var currentUser = ref({
  id: 1,
  email: "tore@gmail.com",
  firstName: "Tore",
} as UserFull); */

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
