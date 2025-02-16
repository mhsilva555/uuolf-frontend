import api from "~/axios-config.js";

export default {
    async get(endpoint, params = {}) {
        try {
            return await api.get(`${endpoint}`, {
                headers: {
                    'ContentType': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${useCookie('authToken').value ?? ""}`,
                },
                params: params
            })
        } catch (e) {
            return {
                status: 400
            }
        }
    },
    async post(endpoint, data, headers = {}) {
        const token = useCookie('authToken').value
        headers.Authorization = `Bearer ${useCookie('authToken').value ?? ""}`
        try {
            return await api.post(`${endpoint}`, data, {headers: headers})
        } catch (e) {
            return {
                error: e,
                status: 500
            }
        }
    }
}