<template>
    <el-card style="margin-bottom: 1rem;">
        <el-row align="middle">
            <el-col :span="2">
                <el-checkbox size="large" class="checkbox"></el-checkbox>
            </el-col>
            <el-col :xs="7" :span="12">
                <el-row>
                    <h1>{{ props.item.type }}</h1>
                </el-row>
                <el-row>
                    <el-text>Lagt til av: {{ props.item.addedBy }}</el-text>
                </el-row>
            </el-col>
            <el-col :xs="15" :span="10">
                <el-row>
                    <div class="spacer"></div>
                    <el-button type="primary" text>antall: {{ props.item.count }}</el-button>
                    <el-button type="danger">slett</el-button>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>
<script lang="ts" setup>

import type {ShoppingListEntry} from "@/services/index";

const props = defineProps<{
    item: ShoppingListEntry
}>()

</script>
<style scoped>

.checkbox {
    margin-right: 1.5rem;

}
</style>