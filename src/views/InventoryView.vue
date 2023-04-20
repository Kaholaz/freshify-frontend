<template>
  <div id="inventory" class="inventory-wrapper">
    <h1>Mitt Kjøleskap</h1>
    <div class="inventory-items-list">
      <ItemCard v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { Item } from "@/services/index";
import ItemCard from "@/components/ItemCard.vue";

// Define refs
const items = ref<Item[]>([
  {
    id: 1,
    type: {
      id: 1,
      name: "Item 1",
    },
    addedBy: {
      id: 1,
      firstName: "John",
    },
  } as Item,
]);

// Other script logic
// TODO: Fetch items from API
</script>

<style scoped>
.inventory-wrapper {
  width: 100%;
  height: 100%;
  padding: 2rem;
  margin: 0;
  overflow: hidden;
}
</style>
