<template>
  <div id="item-card" class="item-card-wrapper">
    <div class="info">
      <h3>{{ item.type?.name }}</h3>
      <p v-if="item.bought">Kjøpt for {{ getDaysSinceBought(item) }} dager siden.</p>
    </div>
    <slot class="buttons-slot"></slot>
  </div>
</template>

<script setup lang="ts">
import type { Item } from "@/services/index";

// Define props
defineProps<{
  item: Item;
}>();

// Define callback functions
function getDaysSinceBought(item: Item): number {
  if (!item.bought) return 0;

  const today = new Date();
  const bought = new Date(item.bought);

  const diffTime = Math.abs(today.getTime() - bought.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
</script>

<style scoped>
/* TODO: Set the padding to be the same above and below if the date is not calculated / visible */
.item-card-wrapper {
  width: 100%;
  padding: 0.8rem 0.6rem 0.2rem 0.6rem;
  border: 1px solid #eceff1;
  border-radius: 5px;

  /* Item card shadow */
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
}

.item-card-wrapper > .buttons-slot {
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
