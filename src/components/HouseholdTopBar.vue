<template>
  <el-row>
    <el-button
      v-if="currentUserPrivelige === 'SUPERUSER'"
      @click="dialogFormVisible = true"
      type="primary"
    >
      <el-icon>
        <Plus />
      </el-icon>
      <span> Legg til bruker</span>
    </el-button>

    <el-dialog v-model="dialogFormVisible" title="Legg til nytt medlem i husholdningen">
      <el-form ref="ruleFormRef" :rules="rules" :model="form">
        <el-form-item label="Brukerens epost" :label-width="formLabelWidth" prop="newUserEmail">
          <el-input v-model="form.newUserEmail" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button ref="confirmButton" type="primary" @click="submitForm(ruleFormRef)">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>

    <div class="spacer" />
    <el-popconfirm
      confirm-button-text="Ja"
      cancel-button-text="Nei"
      icon-color="#F89898"
      title="Slett husholdning"
      @confirm="emit('deleteHousehold')"
    >
      <template #reference>
        <el-button
          v-if="currentUserPrivelige === 'SUPERUSER'"
          type="danger"
          class="menu-item-button"
        >
          <span>Slett Husholdning</span>
        </el-button>
      </template>
    </el-popconfirm>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const ruleFormRef = ref<FormInstance>();

const form = reactive({
  newUserEmail: "" as string,
});

const rules = reactive<FormRules>({
  newUserEmail: [
    { required: true, message: "Please input email", trigger: "blur" },
    { type: "email", message: "Please input correct email", trigger: "blur" },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit("addUser", form.newUserEmail as string);
      dialogFormVisible.value = false;
      formEl.resetFields();
    }
  });
};

const emit = defineEmits<{
  (event: "addUser", args: string): void;
  (event: "deleteHousehold"): void;
}>();

const props = defineProps<{
  currentUserPrivelige: string;
}>();
</script>
