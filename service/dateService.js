export default {
    formatDate(date) {
        date = new Date(date)
        return date.toLocaleDateString('pt-BR');
    }
}