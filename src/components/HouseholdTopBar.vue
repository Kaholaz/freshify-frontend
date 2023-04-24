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
      <el-form :model="form">
        <el-form-item label="Brukerens epost" :label-width="formLabelWidth">
          <el-input v-model="form.newUserEmail" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="
              dialogFormVisible = false;
              printTest();
            "
          >
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

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  newUserEmail: "" as String,
});

//delete this
function printTest() {
  console.log(form.newUserEmail);
  form.newUserEmail = "";
}

const emit = defineEmits<{
  (event: "addUser", args: String): void;
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
