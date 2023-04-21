import { ref } from "vue";
import { defineStore } from "pinia";

import type { Household } from "@/services/index";

export const useHouseholdStore = defineStore("household", () => {
  const household = ref<Household | null>(null);

  function getHousehold() {
    return household.value;
  }

  function setHousehold(newHousehold: Household) {
    household.value = newHousehold;
  }

  return { getHousehold, setHousehold };
});
