export const authStore = defineStore('auth', {
    state: () => ({
        token: null,
        isAuth: null,
    }),
    persist: true,
    actions: {
        setToken(token) {
            this.token = token
        },
        setAuth(param) {
            this.isAuth = param
        },
        deleteSession() {
            this.token = null
            this.isAuth = null
            navigateTo('/')
        }
    },
})