<template>
  <el-table :data="props.tableData" default-sort="amountWasted" height="250" style="width: 100%">
    <el-table-column fixed label="Vare" prop="name" sortable />
    <el-table-column
      :formatter="(row: any) => Math.trunc((Number(row.amountWasted)*100))"
      label="svinn per vare (%)"
      prop="amountWasted"
      sortable
    />
    <el-table-column label="antall brukt" prop="countWasted" sortable />
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
