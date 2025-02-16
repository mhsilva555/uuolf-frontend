import {eventStore} from "~/store/eventStore.js";

export const authStore = defineStore('auth', {
    state: () => ({
        isAuth: null,
        user: null,
    }),
    persist: true,
    actions: {
        setUser(data) {
            this.user = data
        },
        setToken(token) {
            useCookie('authToken', { value: token, maxAge: 60 * 60 * 24 }).value = token
        },
        setAuth(param) {
            this.isAuth = param
        },
        deleteSession() {
            const events = eventStore()

            this.isAuth = null
            this.user = null
            events.changeProfileType(null)
            useCookie('authToken', { maxAge: -1 }).value = '';
            navigateTo('/login')
        }
    },
})