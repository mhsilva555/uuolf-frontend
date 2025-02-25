import {authStore} from "~/store/authStore";
import {cartStore} from "~/store/cartStore";
import authService from "~/service/authService";

export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('authToken').value;
    const auth = authStore()
    const cart = cartStore()

    if (!token) {
        return navigateTo('/login');
    }

    if (process.client) {
        try {
            authService.validateJwt(token).then((response) => {
                if (!response.data || !response.data.auth) {
                    auth.deleteSession()
                    cart.deleteCart()
                    return navigateTo('/login')
                }
            })
        } catch (error) {
            return navigateTo('/login')
        }
    }
})