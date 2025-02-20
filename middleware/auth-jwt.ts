import {authStore} from "~/store/authStore";
import authService from "~/service/authService";

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('authToken').value;
    const auth = authStore()

    if (!token) {
        return navigateTo('/login');
    }

    if (process.client) {
        try {
            authService.validateJwt(token).then((response) => {
                if (!response.data || !response.data.auth) {
                    auth.deleteSession()
                    return navigateTo('/login')
                }
            })
        } catch (error) {
            return navigateTo('/login')
        }
    }
})