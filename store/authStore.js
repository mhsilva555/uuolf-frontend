export const authStore = defineStore('auth', {
    state: () => ({
        isAuth: null,
    }),
    persist: true,
    actions: {
        setToken(token) {
            useCookie('authToken', { value: token, maxAge: 60 * 60 * 24 }).value = token
        },
        setAuth(param) {
            this.isAuth = param
        },
        deleteSession() {
            this.isAuth = null
            useCookie('authToken', { maxAge: -1 }).value = '';
            navigateTo('/login')
        }
    },
})