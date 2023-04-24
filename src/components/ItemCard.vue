<template>
  <el-card
    id="item-card"
    :class="{
      'item-card-wrapper': true,
      'item-card-only-title': computed(() => !item.addedBy),
    }"
  >
    <div class="card-body">
      <div class="info">
        <h3>{{ item.type?.name }}</h3>
        <p v-if="item.bought">Kjøpt for {{ getDaysSinceBought(item) }} dager siden.</p>
      </div>

      <div class="buttons">
        <el-button color="#6200EE" @click="emit('use', item)">Bruk</el-button>
        <el-button type="danger" @click="emit('delete', item)">Slett</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { Item } from "@/services/index";
import { getDaysSinceBought } from "@/utils/item-utils";

// Define props
defineProps<ItemCardProps>();
export interface ItemCardProps {
  item: Item;
}

// Define emits
const emit = defineEmits<ItemCardEmits>();
export interface ItemCardEmits {
  (event: "use", item: Item): void;
  (event: "delete", item: Item): void;
}
</script>

<style scoped>
.item-card-wrapper {
  width: 100%;
  border: 1px solid #eceff1;
  border-radius: 5px;

  /* Item card shadow */
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
}

.card-body {
  display: flex;
}

.card-body > .buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.info {
  flex: 1;
}

.info > p {
  margin: 0;
  font-size: 0.8rem;
  color: #9e9e9e;
}
</style>
