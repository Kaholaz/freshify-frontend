<template>
  <el-container>
    <el-text type="primary" size="large" class="menu-item-text">
      Legg til nytt medlem i husholdningen
    </el-text>

    <el-button class="menu-item-button" @click="dialogFormVisible = true" type="primary">
      <el-icon>
        <Plus />
      </el-icon>
    </el-button>

    <el-dialog v-model="dialogFormVisible" title="Legg til nytt medlem i husholdningen">
      <el-form :model="form">
        <el-form-item label="Brukerens epost" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Rettighetsnivå" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Velg rettighetsnivå">
            <el-option label="suberbruker" value="SUPERBRUKER" />
            <el-option label="bruker" value="BRUKER" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"> Confirm </el-button>
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
      @confirm="deleteHousehold"
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
import { ElMessage } from "element-plus";

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const deleteHousehold = () => {
  ElMessage({
    message: "Husholdningen er blitt slettet",
    type: "success",
  });
};
</script>

<style scoped>
.menu {
  padding: 10px;
}

.flex-grow {
  flex-grow: 1;
}

.menu-item-button {
  margin: auto 1rem;
  align-content: center;
}

.menu-item-text {
  padding-left: 20px;
}
</style>
