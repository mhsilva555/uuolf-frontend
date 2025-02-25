export const cartStore = defineStore('cart', {
    state: () => ({
        cart: {},
        user: null,
    }),
    persist: true,
    actions: {
        setItemCart(item) {
            this.cart = item
        },
        deleteCart() {
            this.cart = {}
        }
    },
})