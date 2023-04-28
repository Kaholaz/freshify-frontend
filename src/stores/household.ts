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

  function removeHousehold() {
    household.value = {} as Household;
    sessionStorage.removeItem("household");
    emitter.emit("household-removed");
    emitter.emit("household-updated");
  }

  return { household, removeHousehold, getHouseholdMemberType, isSuperuser };
});
