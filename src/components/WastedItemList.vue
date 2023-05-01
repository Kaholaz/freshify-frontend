<template>
    <el-card id="edit-profile" class="edit-profile-wrapper">
        <h2>
            Mest svinnede varer
        </h2>
        <div style="margin-top: 20px">
            <el-radio-group v-model="radio">
                <el-radio-button label="Antall svunnet" />
                <el-radio-button label="Andel svunnet (%)" />
            </el-radio-group>
        </div>
        <el-table :data="tableDataWastedItemsByCount" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="itemType" label="Vare" />
            <el-table-column prop="amountWasted" label="Antall svunnet" />
        </el-table>
    </el-card>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import type { Item } from "@/services/index";
import { InventoryApi } from "@/services/index";
import { useHouseholdStore } from "@/stores/household";

const radio = ref('Antall svunnet')
const items = ref<Item[] | null>(null);

// Defines stores
const householdStore = useHouseholdStore();

// Define APIs
const inventoryApi = new InventoryApi();

function updateItems() {
    items.value = null;

    let householdId = getHouseholdId();
    if (householdId == null) return;

    // Load inventory items

}

function getHouseholdId(): number | null {
  let householdId = householdStore.household?.id;

  if (!householdId) {
    // TODO:
    // error.value = new Error("No household id was selected. Can not fetch inventory items.");
    // showError("Ingen hjem valgt.", "Velg et hjem for å se inventaret til hjemmet.", 15000);
    return null;
  }
  return householdId;
}

const tableDataWastedItemsByCount = [
    {
        itemType: 'Melk',
        amountWasted: 9,
    },
    {
        itemType: "Brød",
        amountWasted: 4,
    }
]

const tableDataWastedItemsByAverageAmount = [
    {
        itemType: 'Melk',
        amountWasted: 0.8,
    },
    {
        itemType: "Brød",
        amountWasted: 0.5,
    }
]

// Define APIs and store


// Define emits

// Define refs


const rules = ref({
    firstName: [
        { required: true, message: "Fornavn er påkrevd", trigger: "blur" },
        { min: 2, message: "Fornavn må være minst 2 tegn", trigger: "blur" },
    ],
    email: [
        { required: true, message: "Email er påkrevd", trigger: "blur" },
        { type: "email", message: "Email må være en gyldig email", trigger: "blur" },
    ],
});

// Define callback functions
function validatePasswordConfirm() {
    if (passwordData.value.password !== passwordData.value.passwordConfirm) {
        return Promise.reject("Passordene må være like!");
    } else {
        return Promise.resolve();
    }
}


// Other script logic

</script>
  
<style scoped></style>
  