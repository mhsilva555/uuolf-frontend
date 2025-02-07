export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('authToken').value

    if (token) {
        return navigateTo('/dashboard')
    }
})