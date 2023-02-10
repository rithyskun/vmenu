import { defineStore, acceptHMRUpdate } from "pinia";
import { IProduct } from '~~/types/types'

export const useProductStore = defineStore("sidebar", {
    state: () => ({
        products: [] as IProduct[],
    }),
    actions: {
        async getProducts() {
            const data: IProduct[] = await $fetch('/api/product')
            return this.products = data
        },
        async createProduct (product: IProduct) {
            await useFetch('/api/product', {
                method: "POST",
                body: JSON.stringify(product)
            })
            this.getProducts()
        }
    },
    getters: {},
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}