import { config } from "@vue/test-utils";
import MockNuxtImg from "./mocks/nuxt-img.vue";
import { beforeAll } from "vitest";
import * as Vue from "vue";

config.global.stubs = {
  NuxtImg: MockNuxtImg,
};

beforeAll(() => {
  //@ts-ignore
  global.computed = Vue.computed;
  //@ts-ignore
  global.useCssModule = Vue.useCssModule;
  //@ts-ignore
  global.ref = Vue.ref;
});
