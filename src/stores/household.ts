import { computed, ref } from "vue";
import { defineStore } from "pinia";

import type { Household } from "@/services/index";

export const useHouseholdStore = defineStore("household", () => {
  const householdValue = ref({} as Household);

  const household = computed({
    get: () => {
      if (!householdValue.value?.id) {
        householdValue.value = JSON.parse(sessionStorage.getItem("household") || "{}");
      }
      return householdValue.value;
    },
    set: (val) => {
      householdValue.value = val;
      sessionStorage.setItem("household", JSON.stringify(val));
    },
  });

  return { household };
});
