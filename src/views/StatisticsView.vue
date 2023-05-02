<template>
    <h1>Statistikk</h1>
    <h3>Oversikt</h3>
    <el-text>
        Under ser du hvor mange av varene dine som er kjøpt under 7 dager (grønn), mer enn 7 dager
        (gul), og mer enn 14 dager (rød)
    </el-text>
    <OverviewStatisticsBar
            :danger-percentage="0.1"
            :success-percentage="0.7"
            :warning-percentage="0.2"
            style="margin-bottom: 3rem"
    ></OverviewStatisticsBar>
    <el-col>
        <el-row>
            <div class="spacer"></div>
            <el-form ref="ruleFormRef" :rules="validationRules" :model="formModel">
                <el-form-item prop="selectedDate" label="Velg start måned" label-position="left">
                    <el-input
                            v-model="selectedDate"
                            placeholder="Intervall"
                            style="width: 100%"
                            type="month"
                            @change="updateStatistics"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <h3 style="margin-top: 2rem">Svinn og bruk</h3>
        </el-row>
        <el-row class="row">
            <el-col :span="17" :xs="24" class="text-container">
                <el-text class="centered-text">
                    Din husholdning kaster
                    <h2 v-if="normalHouseholdFoodThrown != foodThrown">
                        {{
                        Math.round(Math.abs(100 * (normalHouseholdFoodThrown - foodThrown) / normalHouseholdFoodThrown))
                        }}%
                    </h2>
                    <span v-if="foodThrown < normalHouseholdFoodThrown">mindre mat enn</span
                    ><span v-if="foodThrown == normalHouseholdFoodThrown">like mye mat som</span
                ><span v-if="foodThrown > normalHouseholdFoodThrown">mer mat enn</span> den
                    gjennomsnittlige norske husholdningen.
                </el-text>
            </el-col>
            <el-col :span="7" :xs="24">
                <el-text>Bruk i %</el-text>
                <EvaluationBar :percentage="foodThrown" :normal-household="normalHouseholdFoodThrown"/>
            </el-col>
        </el-row>
        <el-row class="row odd">
            <el-col :span="16" :xs="24">
                <line-chart :chart-data="chartData"/>
            </el-col>
            <el-col :span="8" :xs="24" class="text-container">
                <el-text class="centered-text">
                    <h3>Hurra!</h3>
                    Du harkastet mindre mat enn det du gjore forrige uke!
                </el-text>
            </el-col>
        </el-row>
        <el-row>
            <h3 style="margin-top: 2rem">Varestatistikk</h3>
        </el-row>
        <el-row class="row">
            <el-col :span="10" :xs="24">
                <el-text class="centered-text">
                    <div v-if="mostWastedItem.amountWasted > 0.2">
                        <h2> Du kaster {{ Math.round(mostWastedItem?.amountWasted * 100) }}% av hver
                            {{ mostWastedItem?.name.toLowerCase() }} </h2>
                        Det er viktig å sjekke utløpsdatoen, samt se, lukte og smake på produktet før du velger å
                        kaste det. Dra nytte av produktet ved å prøve noen gode oppskrifter.

                    </div>
                    <div v-if="mostWastedItem <= 0.2">
                        <h2>Du kaster lite mat!</h2>
                        Du kaster generelt lite av maten du kjøper. Fortsett med det gode arbeidet!
                    </div>
                </el-text>
            </el-col>
            <el-col :span="14" :xs="24" class="text-container">
                <ItemWasteTable :tableData="tableData"></ItemWasteTable>
            </el-col>
        </el-row>
    </el-col>
</template>
<script lang="ts" setup>
import LineChart from "@/components/LineChart.vue";
import EvaluationBar from "@/components/EvaluationBar.vue";
import OverviewStatisticsBar from "@/components/OverviewStatisticsBar.vue";
import ItemWasteTable from "@/components/ItemWasteTable.vue";
import {computed, onMounted, ref} from "vue";
import {DateTime} from "luxon";
import type {WastedItemDTO} from "@/services/index";
import {useHouseholdStore} from "@/stores/household";
import {InventoryApi} from "@/services/apis/inventory-api";

const inventoryApi = new InventoryApi();
const houseHoldStore = useHouseholdStore();
const chartData = ref({
    labels: ["Januar", "Februar", "Mars"],
    datasets: [{data: [40, 20, 12], label: "Bruk"}],
    borderColor: "#ffffff",
    fill: true,
});

const validationRules = {
    selectedDate: [
        {
            validator: (rule, value, callback) => {
                if (DateTime.fromFormat(value, "yyyy-MM") > DateTime.fromJSDate(new Date())) {
                    callback(new Error("Du kan ikke velge en dato i fremtiden"));
                } else {
                    callback();
                }
            },
            trigger: "change",
        },
    ],
};

const tableData = ref([] as WastedItemDTO[]);

const foodThrown = ref(0.8);
const normalHouseholdFoodThrown = 0.45;

const ruleFormRef = ref(null as HTMLElement | null);
let date = new Date();
date.setMonth(date.getMonth() - 1);
const selectedDate = ref(DateTime.fromJSDate(date).toFormat("yyyy-MM"));

onMounted(() => {
    updateStatistics();
});
const formModel = computed(() => ({
    selectedDate: selectedDate.value,
}));

function getChartData() {
    inventoryApi
        .householdIdInventoryWastePerMonthGet(houseHoldStore.household.id, getNumOfMonths())
        .then((res) => {
            const labels = [] as string[];
            const data = [] as number[];
            const currentDate = new Date();
            res.data.forEach((wasted: number) => {
                data.push(wasted * 100);
                labels.push(DateTime.fromJSDate(currentDate).toFormat("MMMM yyyy"));
                currentDate.setMonth(currentDate.getMonth() - 1);
            });
            chartData.value.labels = labels;
            chartData.value.datasets[0].data = data;
        });
}

function getMostUsedItems() {
    inventoryApi
        .householdIdInventoryWasteGet(houseHoldStore.household.id, getNumOfMonths())
        .then((res) => {
            console.log(res.data.wastedItems);
            tableData.value = res.data.wastedItems;
            foodThrown.value = res.data.average;
        });
}

const mostWastedItem = computed(() => {
    if (tableData.value.length == 0) return {} as WastedItemDTO;
    return tableData.value.reduce((prev, current) => {
        return prev.amount > current.amount ? prev : current;
    });
})

function updateStatistics() {
    getChartData();
    if (ruleFormRef.value) {
        ruleFormRef.value.validate((valid: any) => {
            if (valid) {
                getMostUsedItems();
                getChartData();
            } else {
                console.log("invalid");
            }
        });
    }
}

function getNumOfMonths() {
    return Math.floor(
        DateTime.fromJSDate(new Date()).diff(
            DateTime.fromJSDate(new Date(selectedDate.value)),
            "months"
        ).months
    );
}
</script>
<style scoped>
.row {
    height: 20rem;
    margin-bottom: 2rem;
}

.odd {
    background-color: #f5f5f5;
}

.centered-text {
    justify-content: center;
}

.text-container {
    display: flex;
}

.progress {
    margin-bottom: 10px;
}
</style>
