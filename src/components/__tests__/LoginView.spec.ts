import { mount } from "@vue/test-utils";
import LoginView from "@/views/LoginView.vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { createPinia, setActivePinia } from "pinia";
import { ElInput, ElFormItem, ElLink, ElButton, ElAlert, ElForm, ElCard } from 'element-plus';
import mitt from "mitt";
import router from "../../router";

const globalComponents = {
    components: {
        ElInput,
        ElFormItem,
        ElLink,
        ElButton,
        ElAlert,
        ElForm,
        ElCard,
    },
};

const emit = mitt();
const loginUserMock = vi.fn().mockResolvedValue({
    data: {
        id: 1,
        email: "test@example.com",
        firstName: "test",
    }
});
const getHouseholdsMock = vi.fn().mockResolvedValue({
    data: [
        { id: 1, name: "Household1" },
        { id: 2, name: "Household2" },
    ],
});

describe("LoginView.vue", () => {
    let wrapper: any;

    beforeEach(() => {


        setActivePinia(createPinia());
        wrapper = mount(LoginView, {
            global: {
                ...globalComponents,
                mocks: {
                    $router: {
                        push: vi.fn(),
                        beforeEach: vi.fn()
                    },
                },
                provide: {
                    "emitter": emit,
                },
            },
        });
    });

    it("renders the login form", () => {
        expect(wrapper.find(".login-form").exists()).toBe(true);
        expect(wrapper.find("#email-input").exists()).toBe(true);
        expect(wrapper.find("#password-input").exists()).toBe(true);
        expect(wrapper.find("#error-box").exists()).toBe(false);
        expect(wrapper.find("button").text()).toBe("Logg inn");
    });

    it("calls the signIn function when the log in button is clicked", async () => {
        const signInMock = vi.spyOn(wrapper.vm, "signIn");
        const submitButton = wrapper.find("button");

        await submitButton.trigger("click");
        expect(signInMock).toHaveBeenCalled();
    });

    it("displays an error message when there is an authentication error", async () => {
        const errorMessage = "Feil brukernavn eller passord";

        vi.mock("@/services/index", () => ({
            AccountApi: vi.fn().mockImplementation(() => ({
                loginUser: () => Promise.reject({ response: { status: 401 } }),
            })),
            HouseholdApi: vi.fn(),
        }));

        const submitButton = wrapper.find("button");
        await submitButton.trigger("click");
        await nextTick();
        expect(wrapper.find("#error-box").exists()).toBe(true);
        expect(wrapper.find("#error-box").text()).toContain(errorMessage);
    });
});
