<template>
  <el-table
    :data="props.tableData"
    style="width: 100%"
    height="250"
    show-summary
    default-sort="type"
  >
    <el-table-column fixed prop="type" label="Vare" sortable />
    <el-table-column prop="perItem" label="svinn per vare" sortable />
    <el-table-column prop="total" label="totalt" sortable />
  </el-table>
</template>
<script lang="ts" setup>
const props = defineProps<{
  tableData: {
    type: string;
    perItem: string;
    total: string;
  }[];
}>();
</script>
