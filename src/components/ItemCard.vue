<template>
  <div
    id="item-card"
    :class="{
      'item-card-wrapper': true,
      'item-card-only-title': computed(() => !item.addedBy),
    }"
  >
    <div class="info">
      <h3>{{ item.type?.name }}</h3>
      <p v-if="item.bought">Kjøpt for {{ getDaysSinceBought(item) }} dager siden.</p>
    </div>
    <div class="buttons">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { Item } from "@/services/index";
import { getDaysSinceBought } from "@/utils/item-utils";

export interface ItemCardProps {
  item: Item;
}

// Define props
defineProps<ItemCardProps>();

// Define callback functions
</script>

<style scoped>
.item-card-wrapper {
  width: 100%;
  border: 1px solid #eceff1;
  border-radius: 5px;
  padding: 0.8rem 0.6rem 0.2rem 0.6rem;

  /* Item card shadow */
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
}

div.item-card-only-title {
  padding: 0.8rem 0.6rem !important;
}

.item-card-wrapper > .buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.info > p {
  margin: 0;
  font-size: 0.8rem;
  color: #9e9e9e;
}
</style>
