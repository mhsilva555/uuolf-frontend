export default {
    email(email) {
        return /^\w+@\w+\.\w+$/.test(email)
    }
}