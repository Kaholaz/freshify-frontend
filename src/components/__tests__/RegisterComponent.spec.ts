import { mount } from "@vue/test-utils";
import Registration from "@/components/RegisterComponent.vue";
import { describe, expect, it } from "vitest";

describe("Registration.vue", () => {
  it("renders the registration form", () => {
    const wrapper = mount(Registration);
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("requires the user to enter an email address", async () => {
    const wrapper = mount(Registration);
    await wrapper.find("form").trigger("submit");
    expect(wrapper.find(".el-form-item__error").text()).toContain("Fyll ut e-post");
  });

  it("requires the user to enter a valid email address", async () => {
    const wrapper = mount(Registration);
    await wrapper.find('input[type="email"]').setValue("invalid-email");
    await wrapper.find("form").trigger("submit");
    expect(wrapper.find(".el-form-item__error").text()).toContain("Email is invalid");
  });

  it("requires the user to enter a password", async () => {
    const wrapper = mount(Registration);
    await wrapper.find("form").trigger("submit");
    expect(wrapper.find(".el-form-item__error").text()).toContain("Password is required");
  });

  it("submits the registration form when all fields are valid", async () => {
    const wrapper = mount(Registration);
    await wrapper.vm.$nextTick();
    await wrapper.find('input[type="email"]').setValue("test@example.com");
    await wrapper.find('input[type="name"]').setValue("something");
    await wrapper.find('input[type="password"]').setValue("passord123");
    await wrapper.find('input[type="rpassword"]').setValue("passord123");
    await wrapper.findComponent({ name: "ElButton" }).trigger("click");
    expect(wrapper.emitted().submit).toHaveLength(1);
  });
});

//write a vitest that checks if the user is redirected to the login page after registration
