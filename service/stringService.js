export default {
    maskEmail(email) {
        let parts = email.split('@');
        let username = parts[0];
        let domain = parts[1];

        let maskUserName = username.substring(0, 3) + '*'.repeat(username.length - 3);

        return maskUserName + '@' + domain;
    }
}