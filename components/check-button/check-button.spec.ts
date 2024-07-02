import { describe, expect, it } from "vitest";
import CheckButton from "./check-button.vue";
import { mount } from "@vue/test-utils";

describe("CheckButton", () => {
  it("should render a button", () => {
    const wrapper = mount(CheckButton);
    expect(wrapper.find("button").exists()).toBe(true);
  });
  it("should render the right content", () => {
    const text = "Click me";
    const wrapper = mount(CheckButton, {
      slots: {
        default: text,
      },
    });
    expect(wrapper.text()).toContain(text);
  });
  it("should have the right class on active or inactive", async () => {
    const checked = ref(false);
    const wrapper = mount(CheckButton, {
      props: {
        "modelValue:checked": checked,
      },
    });
    const button = wrapper.find("button");
    expect(button.classes().join("-")).not.toContain("isChecked");
    await button.trigger("click");
    expect(button.classes().join("-")).toContain("isChecked");
  });
});
