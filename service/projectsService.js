export default {
    getStatusLabel(status) {
        switch (status) {
            case 'approved':
                return 'Aprovado'
            case 'pending':
                return 'Pendente'
            case 'rejected':
                return 'Rejeitado'
            case 'completed':
                return 'Finalizado'
        }
    },
}