<template>
  <el-card
    id="item-card"
    :class="{
      'item-card-wrapper': true,
      'item-card-only-title': !item.addedBy,
      'warning-age':
        getDaysSinceLastChanged(item).value > 7 && getDaysSinceLastChanged(item).value <= 14,
      'danger-age': getDaysSinceLastChanged(item).value > 14,
    }"
    shadow="hover"
  >
    <div class="card-body">
      <div class="info">
        <el-row style="display: flex; align-items: center; padding-bottom: 0.5rem">
          <h3 style="padding-right: 0.5rem">{{ item.type?.name }}</h3>
          <el-space v-if="getDaysSinceLastChanged(item).value > 14" :size="5" wrap>
            <el-tag
              style="background-color: #ebf5e1; border-color: #ffffff; --el-color-primary: #007225"
            >
              Obs! Se, lukt, smak!
            </el-tag>
          </el-space>
        </el-row>
        <el-text v-if="item.bought && getDaysSinceBought(item) > 0"
          >Kjøpt for {{ getDaysSinceBought(item) }} dager siden.
        </el-text>
        <el-text v-else-if="item.bought && getDaysSinceBought(item) === 0">Kjøpt i dag</el-text>
        <el-text v-if="item.bought !== item.lastChanged">
          Sjekket for {{ getDaysSinceLastChanged(item) }} dager siden
        </el-text>
      </div>

      <div class="buttons">
        <el-button id="extend-button" type="primary" @click="emit('extend')"
          >Forleng varighet
        </el-button>
        <el-button id="use-button" type="primary" @click="emit('use', item)">Bruk</el-button>
        <el-button id="delete-button" type="danger" @click="emit('delete', item)">Slett</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import type { Item } from "@/services/index";
import { getDaysSinceBought, getDaysSinceLastChanged } from "@/utils/item-utils";

// Define props
defineProps<ItemCardProps>();

export interface ItemCardProps {
  item: Item;
}

// Define emits
const emit = defineEmits<ItemCardEmits>();

export interface ItemCardEmits {
  (event: "extend"): void;

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

@media (max-width: 450px) {
  .card-body {
    flex-direction: column;
  }

  .card-body > .buttons {
    margin-top: 0.5rem;
    justify-content: flex-start;
  }
}
</style>
