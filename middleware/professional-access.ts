import {eventStore} from "~/store/eventStore"

export default defineNuxtRouteMiddleware((to, from) => {
    const events = eventStore()

    if (events.profileType !== "professional") {
        return navigateTo('/dashboard')
    }
})