import requestService from "~/service/requestService.js"

export default {
    async login(email, password) {
        return await requestService.post('/user/login', {
            email: email,
            password: password
        })
    },
    async passwordReset(email) {
        return await requestService.post('/user/password-reset', {
            email: email
        })
    }
}