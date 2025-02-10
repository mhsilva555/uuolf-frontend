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
    },
    async checkToken(token) {
        return await requestService.get(`/user/password-token/${token}`)
    },
    async passwordUpdate(data) {
        if (typeof data !== 'object') {
            return false;
        }

        return await requestService.post('/user/password-update', data)
    }
}