import { computed, inject, ref } from "vue";
import { defineStore } from "pinia";

import type { Household, HouseholdMemberKey, UserFull } from "@/services/index";
import { HouseholdApi, HouseholdUserType } from "@/services/index";
import { useSessionStore } from "@/stores/session";

export const useHouseholdStore = defineStore("household", () => {
  const householdValue = ref({} as Household);
  const householdMemberTypeValue = ref(undefined as HouseholdUserType | undefined);
  const emitter = inject("emitter");
  const sessionStore = useSessionStore();
  const householdApi = new HouseholdApi();
  const households = ref([] as Household[]);

  const getHouseholdMemberType = () => householdMemberTypeValue.value;
  const isSuperuser = () => householdMemberTypeValue.value === HouseholdUserType.SUPERUSER;

  const household = computed({
    get: () => {
      if (!householdValue.value?.id) {
        if (sessionStorage.getItem("household")) {
          // SEE THE WARNING!!!!
          household.value = JSON.parse(sessionStorage.getItem("household") || "{}");
        }
      }
      return householdValue.value;
    },
    // DO NOT CALL THE GETTER WHILE RETRIEVING THE VALUE FROM SESSION STORAGE !!!!!!!
    set: (val) => {
      householdValue.value = val;
      sessionStorage.setItem("household", JSON.stringify(val));
      householdApi
        .getUsers(val?.id as number)
        .then((data: { data: any }) => data.data)
        .then(
          (
            items: Array<{ id: HouseholdMemberKey; user: UserFull; userType: HouseholdUserType }>
          ) => {
            items
              .filter((item) => item.user.id === sessionStore.getUser()?.id)
              .forEach((item) => {
                householdMemberTypeValue.value = item.userType;
              });
          }
        );
      emitter.emit("household-updated");
    },
  });

  function fetchHouseholds() {
    const userId = sessionStore.getUser()?.id;

    if (!userId) {
      console.error("User not logged in when fetching households");
      return;
    }

    householdApi.getHouseholds(userId).then((res) => {
      households.value = res.data;
      if (households.value?.length > 0 && !household.value?.id) {
        household.value = households.value[0];
      }
    });
  }

  function addHousehold(newHousehold: Household) {
    households.value.push(newHousehold);
    household.value = newHousehold;
  }

  function deleteCurrentHousehold() {
    household.value = {} as Household;
    sessionStorage.removeItem("household");
    fetchHouseholds();
    emitter.emit("household-removed");
  }

  return {
    household,
    households,
    removeHousehold: deleteCurrentHousehold,
    getHouseholdMemberType,
    isSuperuser,
    fetchHouseholds,
    addHousehold,
  };
});
