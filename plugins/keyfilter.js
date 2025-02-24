import { defineNuxtPlugin } from "#app";
import {KeyFilter} from "primevue";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.directive("keyfilter", KeyFilter);
})