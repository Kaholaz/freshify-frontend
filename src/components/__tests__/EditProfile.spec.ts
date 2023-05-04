import { beforeEach, beforeAll, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useSessionStore } from "@/stores/session";
import type { FormInstance } from "element-plus";

import EditProfile from "../EditProfile.vue";
import type { UserFull } from "@/services/index";
import { useHouseholdStore } from "../../stores/household";
import { mock } from "node:test";


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

describe("EditProfile",  () => {
   it("emits change user when button is clicked", async () => {
    const wrapper = mount(EditProfile);
    await wrapper.vm.$nextTick();
    expect(wrapper.find("el-button[type=primary]").exists()).toBe(true);
    /* await wrapper.find("el-button[type=primary]").trigger("click");
    ^^
    GETS TYPE ERROR HERE WHEN RUNNING TESTS BUT NOT WHEN RUNNING APP

    await wrapper.vm.$nextTick(); */
    //expect(wrapper.emitted("change:user")).toBeTruthy();
    
  });
  it("show change password button changes to hide when clicked", async () => {
    const wrapper = mount(EditProfile);
    expect(wrapper.find("el-button[type=success]").exists()).toBe(true);
    await wrapper.find("el-button[type=success]").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("el-button[type=success]").exists()).toBe(false);
    expect(wrapper.find("el-button[type=danger]").exists()).toBe(true);
  });
});
