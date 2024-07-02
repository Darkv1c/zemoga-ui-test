import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Button from "./button.vue";

describe("Button", () => {
  it("should render a button", () => {
    const wrapper = mount(Button);
    expect(wrapper.find("button").exists()).toBe(true);
  });
  it("should render a button with the right text", () => {
    const wrapper = mount(Button, {
      props: {
        text: "Click me",
      },
    });
    expect(wrapper.find("button").text()).toBe("Click me");
  });
  it("should emit click on click button", async () => {
    const wrapper = mount(Button);
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });
});
