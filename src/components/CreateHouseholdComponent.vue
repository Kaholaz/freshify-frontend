<template>
  <h2>Lag husholdning</h2>
  <el-form
    ref="ruleFormRef"
    :model="houseHold"
    :rules="validationRules"
    label-position="top"
    status-icon
    @submit.prevent
  >
    <el-form-item label="Navn på husholdning" prop="householdName">
      <el-input
        v-model="householdName"
        placeholder="husholdning"
        type="text"
        id="household-name-input"
        @keyup.enter="createHousehold"
      ></el-input>
    </el-form-item>
    <el-row style="margin-top: 1rem">
      <el-form-item style="margin: 0">
        <el-button type="primary" @click="createHousehold">Lag husholdning</el-button>
      </el-form-item>
      <div class="spacer"></div>
      <el-link @click="$emit('skip')">Jeg ønsker ikke å lage husholdning</el-link>
    </el-row>
  </el-form>
</template>
<script lang="ts" setup>
import { computed, ref, defineEmits } from "vue";
import type { FormInstance } from "element-plus";
import type { CreateHousehold } from "@/services/index";

const props = defineProps<{
  householdName: string;
}>();

const ruleFormRef = ref<FormInstance>();
const validationRules = ref({
  householdName: [{ required: true, message: "Husholdningens navn er påkrevd", trigger: "blur" }],
});

const emit = defineEmits<{
  (event: "update:householdName", householdName: string): void;
  (event: "skip"): void;
  (event: "submit"): void;
}>();

const householdName = computed({
  get: () => props.householdName,
  set: (value) => {
    console.log(value);
    emit("update:householdName", value);
  },
});

const houseHold = computed(() => {
  return {
    householdName: householdName.value,
  } as CreateHousehold;
});

function createHousehold() {
  if (!ruleFormRef.value) {
    return;
  }
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      emit("submit");
    }
  });
}
</script>
