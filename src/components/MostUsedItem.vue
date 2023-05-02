<template>
  <el-table
    :data="props.tableData"
    style="width: 100%"
    height="250"
    show-summary
    default-sort="type"
  >
    <el-table-column fixed prop="name" label="Vare" sortable />
    <el-table-column prop="amountWasted" label="svinn per vare" sortable />
    <el-table-column prop="countWasted" label="totalt" sortable />
  </el-table>
</template>
<script lang="ts" setup>
const props = defineProps<{
  tableData: {
    name: string;
    amountWasted: string;
    countWasted: string;
  }[];
}>();
</script>
