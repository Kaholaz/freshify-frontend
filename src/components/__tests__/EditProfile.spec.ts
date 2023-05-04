import { beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useSessionStore } from "@/stores/session";

import EditProfile from "../EditProfile.vue";
import type { UserFull } from "@/services/index";
import { useHouseholdStore } from "../../stores/household";

let user: UserFull;

beforeEach(() => {
  const loggedInUser = {
    id: 14,
    firstName: "Roger",
    email: "roger@gmail.no",
  } as UserFull;
  setActivePinia(createPinia());
  useSessionStore().authenticate(loggedInUser);
  useHouseholdStore().isSuperuser = () => true;
});

describe("HouseholdCard",  () => {
   it("emits change user when button is clicked", async () => {
    const wrapper = mount(EditProfile as any);
    await wrapper.find("el-button[type=primary]").trigger("click");
    expect(wrapper.emitted("change:user")).toBeTruthy();
  });
});
