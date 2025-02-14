export const eventStore = defineStore('events', {
    state: () => ({
        profileType: null,
        progress: false,
    }),
    persist: true,
    actions: {
        changeProfileType(type) {
            this.profileType = type
        }
    },
})