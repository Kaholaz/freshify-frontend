<template>
  <el-card style="margin-bottom: 1rem" v-loading="props.item?.loading">
    <el-row align="middle">
      <el-col :span="2">
        <el-checkbox
          :checked="item.checked"
          :disabled="item.suggested"
          class="checkbox"
          size="large"
          @change="$emit('click', item.checked)"
        ></el-checkbox>
      </el-col>
      <el-col :sm="8" :xs="6">
        <el-row>
          <h5>{{ props.item.type.name }}</h5>
        </el-row>
        <el-row>
          <el-text
            >Lagt til av: <span class="name">{{ props.item.addedBy.firstName }}</span></el-text
          >
        </el-row>
      </el-col>
      <el-col :sm="14" :xs="15">
        <el-row>
          <div class="spacer"></div>
          <el-button text type="primary">antall: {{ props.item.count }}</el-button>
          <el-button v-if="props.item.suggested" text type="success" @click="emit('accept', item)"
            >godta
          </el-button>
          <el-button text type="danger" @click="emit('delete', item)">slett</el-button>
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

@media only screen and (max-width: 768px) {
  .name {
    display: block;
  }
}
</style>
