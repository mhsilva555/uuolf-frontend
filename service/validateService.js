export default {
    email(email) {
        return /^\w+@\w+\.\w+$/.test(email)
    },
    passwordSecurity(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
        return regex.test(password);
    },
}