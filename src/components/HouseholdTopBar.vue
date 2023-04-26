<template>
  <el-container>
    <el-text type="primary" size="large" class="menu-item-text">
      Legg til nytt medlem i husholdningen
    </el-text>

    <el-button class="menu-item-add-button" @click="dialogFormVisible = true" type="primary">
      <el-icon>
        <Plus />
      </el-icon>
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

    <div class="flex-grow" />
    <el-popconfirm
      confirm-button-text="Yes"
      cancel-button-text="No"
      :icon="WarnTriangleFilled"
      icon-color="#F89898"
      title="Are you sure to delete this?"
      @confirm="emit('deleteHousehold')"
    >
      <template #reference>
        <el-button type="danger" class="menu-item-button">
          <span>Slett Husholdning</span>
        </el-button>
      </template>
    </el-popconfirm>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Plus, WarnTriangleFilled } from "@element-plus/icons-vue";
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
      console.log("submit!");
      emit("addUser", form.newUserEmail as string);
      dialogFormVisible.value = false;
    } else {
      console.log("error submit!!", fields);
    }
  });
};

const emit = defineEmits<{
  (event: "addUser", args: string): void;
  (event: "deleteHousehold"): void;
}>();
</script>

<style scoped>
.menu {
  padding: 10px;
}

.flex-grow {
  flex-grow: 1;
}

.menu-item-add-button {
  margin: auto 1rem;
  align-content: right;
}

.menu-item-text {
  padding-left: 0px;
}
</style>
