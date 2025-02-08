import {authStore} from "~/store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = authStore()
    const token = useCookie('authToken').value;

    if (!token) {
        return navigateTo('/login');
    }

    if (process.client) {
        if (!auth.isAuth) {
            return navigateTo('/login')
        }
    }
})