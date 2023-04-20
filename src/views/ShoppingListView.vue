<template>
    <h1 style="font-size: 60px;">Handleliste</h1>
    <el-card>
        <el-row :gutter="10">
            <el-col :xs="12" :span="15">
                <el-input placeholder="varetype" type="text" v-model="newItem.type" />
            </el-col>
            <el-col :xs="5" :span="5">
                <el-input placeholder="antall" v-model="newItem.count" type="number" />
            </el-col>
            <el-col :xs="7" :span="4">
                <el-row>
                    <div class="spacer" />
                    <el-button type="success">legg til</el-button>
                </el-row>

            </el-col>
        </el-row>
    </el-card>
    <el-divider/>
    <ShoppingListCard v-for="item in activeItems" :item="item" :key="item.id"></ShoppingListCard>
    <el-row class="divider-row">
        <el-text>Foreslåtte varer</el-text>
        <div style="flex-grow: 1; "></div>
        <el-button type="success" plain>Godta alle</el-button>
        <el-button type="danger" plain>Avslå alle</el-button>
    </el-row>
    <ShoppingListCard v-for="item in requestedItems" :item="item" :key="item.id"></ShoppingListCard>
    <el-divider/>
    <el-row class="divider-row">
        <el-text>Kjøpte varer</el-text>
        <div style="flex-grow: 1; "></div>
        <el-button type="primary" plain>Flytt til oversikt</el-button>
    </el-row>
    <ShoppingListCard v-for="item in boughtItems" :item="item" :key="item.id"></ShoppingListCard>

</template>
<script setup lang="ts">
import ShoppingListCard from "@/components/ShoppingListCard.vue";
import type {ShoppingListEntry} from "@/services";
import {ref} from "vue";

const newItem = ref({
    type: "",
    count: 0,
    checked: false,
    checkedBy: "",
    suggested: false,
    addedBy: "",
}) as ShoppingListEntry;

const testItem = {
    type: "hei",
    count: 1,
    checked: false,
    checkedBy: "hei",
    suggested: true,
    addedBy: "hei",
};

const items = new Map() as Map<string, number>;
const activeItems = [testItem, testItem, testItem] as ShoppingListEntry[];
const requestedItems = [testItem, testItem, testItem] as ShoppingListEntry[];
const boughtItems = [testItem, testItem, testItem] as ShoppingListEntry[];



</script>
<style scoped>
.divider-row {
    margin-top: 0;
    margin-bottom: 1rem;
}
</style>