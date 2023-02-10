import { defineStore, acceptHMRUpdate } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
    state: () => ({
        sidebar: true,
    }),
    actions: {
        toggleSidebar(state: boolean = false) {
            this.sidebar = !this.sidebar;
        },
    },
    getters: {},
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSidebarStore, import.meta.hot));
}