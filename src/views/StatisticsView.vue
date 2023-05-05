<template>
  <h1>Statistikk</h1>
  <h3>Oversikt</h3>
  <el-text>
    Under ser du hvor mange av varene dine som er kjøpt under 7 dager (grønn), mer enn 7 dager
    (gul), og mer enn 14 dager (rød)
  </el-text>
  <OverviewStatisticsBar
    :danger-percentage="dangerPercentage"
    :success-percentage="successPercentage"
    :warning-percentage="warningPercentage"
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
        <el-skeleton :row="5" v-if="loading"></el-skeleton>
        <el-text class="centered-text" v-else>
          Din husholdning kaster
          <h2 v-if="normalHouseholdFoodThrown != foodThrown">
            {{
              Math.round(
                Math.abs(
                  (100 * (normalHouseholdFoodThrown - foodThrown)) / normalHouseholdFoodThrown
                )
              )
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
        <EvaluationBar :percentage="foodThrown" :normal-household="normalHouseholdFoodThrown" />
      </el-col>
    </el-row>
    <el-row class="row odd">
      <el-col :span="16" :xs="24">
        <line-chart :chart-data="chartData" />
      </el-col>
      <el-col :span="8" :xs="24" class="text-container">
        <el-skeleton :row="5" v-if="loading"></el-skeleton>
        <el-text class="centered-text" v-else>
          <div v-if="diffFromLastMonth <= 0.15 && diffFromLastMonth >= -0.15"></div>
          <div v-else-if="diffFromLastMonth > 0.15">
            <h4>
              Du har kastet {{ Math.round(Math.abs(diffFromLastMonth) * 100) }}% mer mat enn det du
              fjorde forrige måned
            </h4>
            Det er viktig å sjekke utløpsdatoen, samt se, lukte og smake på maten før du kaster den.
          </div>
          <div v-else-if="diffFromLastMonth < 0.15">
            <h4>
              Du har kastet {{ Math.round(Math.abs(diffFromLastMonth) * 100) }}% mindre mat enn det
              du gjorde forrige måned
            </h4>
            Fortsett med det gode arbeidet!
          </div>
        </el-text>
      </el-col>
    </el-row>
    <el-row>
      <h3 style="margin-top: 2rem">Varestatistikk</h3>
    </el-row>
    <el-row class="row">
      <el-col :span="10" :xs="24">
        <el-skeleton :rows="5" v-if="loading" />
        <el-text class="centered-text" v-else>
          <div v-if="mostWastedItem.amountWasted > 0.2">
            <h2>
              Du kaster {{ Math.round(mostWastedItem?.amountWasted * 100) }}% av hver
              {{ mostWastedItem?.name.toLowerCase() }}
            </h2>
            Det er viktig å sjekke utløpsdatoen, samt se, lukte og smake på produktet før du velger
            å kaste det. Dra nytte av produktet ved å prøve noen gode oppskrifter.
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
  <WastedItemList></WastedItemList>
</template>
<script lang="ts" setup>
import LineChart from "@/components/LineChart.vue";
import EvaluationBar from "@/components/EvaluationBar.vue";
import OverviewStatisticsBar from "@/components/OverviewStatisticsBar.vue";
import ItemWasteTable from "@/components/ItemWasteTable.vue";
import { computed, onMounted, ref } from "vue";
import { DateTime } from "luxon";
import type { WastedItemDTO } from "@/services/index";
import { useHouseholdStore } from "@/stores/household";
import { InventoryApi } from "@/services/apis/inventory-api";
import { showError } from "@/utils/error-utils";
import type { FormInstance } from "element-plus";
import { getDaysSinceBought } from "@/utils/item-utils";

const inventoryApi = new InventoryApi();
const houseHoldStore = useHouseholdStore();
const chartData = ref({
  labels: [],
  datasets: [
    {
      data: [],
      label: "Bruk",
      borderColor: "#3e95cd",
      backgroundColor: "#3e95cd",
      fill: true,
    },
  ],
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
    {
      validator: (rule, value, callback) => {
        if (
          DateTime.fromFormat(value, "yyyy-MM").diff(DateTime.fromJSDate(new Date()), ["years"])
            .years < -1
        ) {
          callback(new Error("Du kan ikke velge en dato som er mer enn et år tilbake i tid"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
};

const tableData = ref([] as WastedItemDTO[]);

const foodThrown = ref(0);
const normalHouseholdFoodThrown = 0.5;

const ruleFormRef = ref(null as FormInstance | null);

let date = new Date();
date.setMonth(date.getMonth() - 1);
const selectedDate = ref(DateTime.fromJSDate(date).toFormat("yyyy-MM"));

const loading = ref(true);

onMounted(() => {
  updateStatistics();
});
const formModel = computed(() => ({
  selectedDate: selectedDate.value,
}));

const diffFromLastMonth = ref(0);
async function getChartData() {
  await inventoryApi
    .householdIdInventoryWastePerMonthGet(houseHoldStore.household.id, getNumOfMonths())
    .then((res) => {
      let clone = { ...chartData.value };
      const labels = [] as string[];
      const data = [] as number[];
      const currentDate = new Date();
      res.data.forEach((wasted: number) => {
        data.push(wasted * 100);
        labels.push(DateTime.fromJSDate(currentDate).toFormat("MMMM yyyy"));
        currentDate.setMonth(currentDate.getMonth() - 1);
      });
      clone.labels = labels;
      clone.datasets = [{ data: data, label: "Bruk" }];
      clone.datasets[0].data = data.reverse();
      chartData.value = clone;
      diffFromLastMonth.value = (data[0] - data[1]) / data[1];
      console.log(diffFromLastMonth.value);
    });
}

async function getMostUsedItems() {
  await inventoryApi
    .householdIdInventoryWasteGet(houseHoldStore.household.id, getNumOfMonths())
    .then((res) => {
      tableData.value = res.data.wastedItems;
      foodThrown.value = res.data.average;
    });
}

const mostWastedItem = computed(() => {
  if (tableData.value.length == 0) return {} as WastedItemDTO;
  return tableData.value.reduce((prev, current) => {
    return prev.amount > current.amount ? prev : current;
  });
});

function updateStatistics() {
  getChartData();
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate(async (valid: any) => {
    if (!valid) return;
    let id = setTimeout(() => {
      loading.value = true;
      clearTimeout(id);
    }, 100);
    try {
      await getMostUsedItems();
      await getChartData();
    } catch (e) {
      showError("Noe gikk galt", "Vennligt prøv igjen senere", 0);
    } finally {
      clearTimeout(id);
      loading.value = false;
    }
  });
}

const dangerPercentage = ref(0);
const warningPercentage = ref(0);
const successPercentage = ref(0);
getInventoryStatus();

function getInventoryStatus() {
  const householdId = houseHoldStore.household.id;
  if (householdId == null) return;

  let totalDanger = 0;
  let totalWarning = 0;
  let totalSuccess = 0;
  // Load inventory items
  inventoryApi
    .getInventoryItems(householdId)
    .then((response) => response.data)
    .then((data) => {
      data.forEach((item) => {
        if (getDaysSinceBought(item) > 14) {
          totalDanger += 1;
        } else if (getDaysSinceBought(item) > 7) {
          totalWarning += 1;
        } else {
          totalSuccess += 1;
        }
      });
      dangerPercentage.value = (totalDanger / data.length) * 100;
      warningPercentage.value = (totalWarning / data.length) * 100;
      successPercentage.value = (totalSuccess / data.length) * 100;
    })
    .catch(() => (dangerPercentage.value = warningPercentage.value = successPercentage.value = 0));
}

function getNumOfMonths() {
  return (
    Math.floor(
      DateTime.fromJSDate(new Date()).diff(
        DateTime.fromJSDate(new Date(selectedDate.value)),
        "months"
      ).months
    ) + 1
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
