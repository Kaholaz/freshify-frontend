<template>
  <el-card
    id="item-card"
    :class="{
      'item-card-wrapper': true,
      'item-card-only-title': !item.addedBy,
      'warning-age': getDaysSinceBought(item) > 7 && getDaysSinceBought(item) <= 14,
      'danger-age': getDaysSinceBought(item) > 14,
    }"
    shadow="always"
  >
    <div class="card-body">
      <div class="info">
        <h3>{{ item.type?.name }}</h3>
        <el-text v-if="item.bought && getDaysSinceBought(item) > 0"
          >Kjøpt for {{ getDaysSinceBought(item) }} dager siden.
        </el-text>
        <el-text v-else-if="item.bought && getDaysSinceBought(item) == 0"> Kjøpt i dag</el-text>
      </div>

      <div class="buttons">
        <el-button id="use-button" type="primary" @click="emit('use', item)">Bruk</el-button>
        <el-button id="delete-button" type="danger" @click="emit('delete', item)">Slett</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
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

.warning-age {
  border: 1px solid orange !important;
}

.danger-age {
  border: 1px solid red !important;
}
</style>
