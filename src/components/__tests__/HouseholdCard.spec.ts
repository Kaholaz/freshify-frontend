import { beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useSessionStore } from "@/stores/session";

import HouseholdCard from "../HouseholdCard.vue";
import type { UserFull } from "@/services/index";
import { HouseholdUserType } from "@/services/index";
import { useHouseholdStore } from "../../stores/household";

let user: UserFull;
let userType: HouseholdUserType;

beforeEach(() => {
  userType = "SUPERUSER";
  user = {
    id: 13,
    firstName: "Joe",
    email: "shmoe@gmail.com",
  } as UserFull;

  const loggedInUser = {
    id: 14,
    firstName: "Roger",
    email: "roger@gmail.no",
  } as UserFull;
  setActivePinia(createPinia());
  useSessionStore().authenticate(loggedInUser);
  useHouseholdStore().isSuperuser = () => true;
});

describe("HouseholdCard", () => {
  it("has users first name in title", () => {
    const wrapper = mount(HouseholdCard as any, {
      props: {
        householdMember: {
          user,
          userType,
        },
      },
    });
    expect(wrapper.text()).toContain(user.firstName);
  });

  it("has users email in text", () => {
    const wrapper = mount(HouseholdCard as any, {
      props: {
        householdMember: {
          user,
          userType,
        },
      },
    });
    expect(wrapper.text()).toContain(user.email);
  });

  it("has users type in text", () => {
    const wrapper = mount(HouseholdCard as any, {
      props: {
        householdMember: {
          user,
          userType,
        },
      },
    });
    expect(wrapper.text()).toContain(userType === "SUPERUSER" ? "SUPERBRUKER" : "BRUKER");
  });

  it("has demote to user button if user is superuser", () => {
    const wrapper = mount(HouseholdCard as any, {
      props: {
        householdMember: {
          user,
          userType: HouseholdUserType.SUPERUSER,
        },
      },
    });
    expect(wrapper.find("el-button[type=primary]").text()).toContain("Degrader bruker");
  });

  it("emits demote event when demote button is clicked", async () => {
    const wrapper = mount(HouseholdCard as any, {
      props: {
        householdMember: {
          user,
          userType,
        },
      },
    });
    await wrapper.find("el-button[type=primary]").trigger("click");
    expect(wrapper.emitted("updateUserPrivilege")).toBeTruthy();
  });

  it("has remove from household button", () => {
    const wrapper = mount(HouseholdCard as any, {
      props: {
        householdMember: {
          user,
          userType,
        },
      },
    });
    expect(wrapper.find("el-button[type=danger]").text()).toContain("Fjern bruker");
  });

  it("user with same id as logged in user does not have remove from household button, demote or promote", () => {
    useSessionStore().authenticate(user);
    const wrapper = mount(HouseholdCard as any, {
      props: {
        householdMember: {
          user: useSessionStore().getUser(),
          userType,
        },
      },
    });

    expect(wrapper.find("el-button[type=danger]").exists()).toBeFalsy();
    expect(wrapper.find("el-button[type=primary]").exists()).toBeFalsy();
  });
});
