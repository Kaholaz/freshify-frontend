<template>
  <el-card style="margin-bottom: 1rem">
    <el-row align="middle">
      <el-col :span="2">
        <el-checkbox
          size="large"
          :checked="item.checked"
          :disabled="item.suggested"
          class="checkbox"
          @change="$emit('click', item.checked)"
        ></el-checkbox>
      </el-col>
      <el-col :xs="7" :span="12">
        <el-row>
          <h5>{{ props.item.type.name }}</h5>
        </el-row>
        <el-row>
          <el-text>Lagt til av: {{ props.item.addedBy.firstName }}</el-text>
        </el-row>
      </el-col>
      <el-col :xs="15" :span="10">
        <el-row>
          <div class="spacer"></div>
          <el-button type="primary" text>antall: {{ props.item.count }}</el-button>
          <el-button @click="emit('accept', item)" v-if="props.item.suggested" type="success" text
            >godta</el-button
          >
          <el-button @click="emit('delete', item)" type="danger" text>slett</el-button>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<script lang="ts" setup>
import type { ShoppingListEntry } from "@/services/index";

const props = defineProps<{
  item: ShoppingListEntry;
}>();

const emit = defineEmits<{
  (event: "click", args: boolean): void;
  (event: "delete", args: ShoppingListEntry): void;
  (event: "accept", args: ShoppingListEntry): void;
}>();
</script>
<style scoped>
.checkbox {
  margin-right: 1.5rem;
}
</style>
