<template>
  <h2>Lag husholdning</h2>
  <el-form :model="householdName" ref="ruleFormRef" label-position="top" status-icon>
    <el-form-item label="Navn på husholdning" prop="houseHoldName">
      <el-input v-model="householdName" placeholder="husholdning"></el-input>
    </el-form-item>
    <el-row>
      <div class="spacer"></div>
      <el-link @click="skipCreateHousehold">Jeg ønsker ikke å lage husholdning</el-link>
    </el-row>
    <el-form-item>
      <el-button @click="createHousehold" type="primary">Lag husholdning</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import type { FormInstance } from "element-plus";

const props = defineProps<{
  householdName: string;
}>();
const ruleFormRef = ref<FormInstance>();

const emit = defineEmits<{
  "update:householdName": (householdName: string) => void;
  skip: () => void;
  submit: () => void;
}>();

const householdName = computed({
  get: () => props.householdName,
  set: (value) => emit("update:householdName", value),
});

const validationRules = ref({
  householdName: [{ required: true, message: "Husholdningens navn er påkrevd", trigger: "blur" }],
});

function skipCreateHousehold() {
  emit("skip");
}

function createHousehold() {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      emit("submit");
    }
  });
}
</script>
