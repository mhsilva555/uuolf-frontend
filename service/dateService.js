export default {
    formatDate(date) {
        date = new Date(date)
        return date.toLocaleDateString('pt-BR');
    },
    formatDateWithHours(date) {
        date = new Date(date);
        return date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            month: 'long',
            minute: '2-digit',
            hour: '2-digit',
            day: '2-digit',
            sameDay: '2-digit',
        });
    }
}