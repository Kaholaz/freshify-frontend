import { computed, inject, ref } from "vue";
import { defineStore } from "pinia";

import type { Household } from "@/services/index";

export const useHouseholdStore = defineStore("household", () => {
  const householdValue = ref({} as Household);
  const emitter = inject("emitter");

  const household = computed({
    get: () => {
      if (!householdValue.value?.id) {
        if (sessionStorage.getItem("household")) {
          householdValue.value = JSON.parse(sessionStorage.getItem("household") || "{}");
        }
      }
      return householdValue.value;
    },
    set: (val) => {
      householdValue.value = val;
      sessionStorage.setItem("household", JSON.stringify(val));
      emitter.emit("household-updated");
    },
  });

  function removeHousehold() {
    household.value = {} as Household;
    sessionStorage.removeItem("household");
    emitter.emit("household-removed");
    emitter.emit("household-updated");
  }

  return { household, removeHousehold };
});
