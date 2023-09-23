<script setup lang="ts">
import { useCartStore } from '~/stores/carts'
import { AppHelper } from '~/server/utils/helper'
import type { ICartItem } from '~/types'

const store = useCartStore()
const cart = computed(() => {
  return store.getAvailableItemInCart
})

const { t } = useI18n()
const modal = ref<boolean>(false)
const loading = ref<boolean>(false)
const phone = ref<string>('')
const address = ref<string>('')

const closeModal = () => {
  nextTick(() => {
    modal.value = false
  })
}

const formTitle = computed(() => {
  return t('cart')
})

const grandTotal = computed(() => {
  return store.getGrandTotal
})

const showModalCartItem = () => {
  if (!cart.value.length) {
    return useSnackbar({
      show: true,
      text: 'The cart is empty',
      color: 'error',
    })
  }

  modal.value = true
}

const increaseQty = (item: any) => {
  store.increaseItemQty(item)
}

const decreaseQty = (item: any) => {
  store.decreaseItemQty(item)
}

const reset = () => {
  store.$reset()
  phone.value = ''
  address.value = ''
  modal.value = false
}

const submitOrder = () => {
  if (!phone.value) {
    return useSnackbar({
      show: true,
      text: 'The phone number is required',
      color: 'error',
    })
  }

  if (!cart.value.length) {
    return useSnackbar({
      show: true,
      text: 'The cart item is empty',
      color: 'error',
    })
  }

  const payload: ICartItem = {
    phone: phone.value,
    address: address.value,
    carts: cart.value,
  }

  store.submitOrder(payload)
  reset()
}
</script>

<template>
  <NuxtLink type="button" class="relative inline-flex hover:cursor-pointer items-center p-2 text-sm font-medium text-center text-gray-900 hover:rounded-md dark:text-white " @click="showModalCartItem">
    <Icon name="cart" size="18" />
    <span class="sr-only">Cart</span>
    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-blue-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
      {{ cart.length }}
    </div>
  </NuxtLink>
  <!-- Modal Cart Item  -->
  <SharedModal v-show="modal" @close="closeModal">
    <template #header>
      {{ formTitle }}
    </template>
    <template #body>
      <div id="cart-item" name="cart-item">
        <div class="w-full dark:bg-gray-500 dark:border-gray-700">
          <div class="flex items-center justify-between mb-2">
            <h5 class="text-sm font-bold leading-none text-gray-900 dark:text-white">
              {{ t('product') }}
            </h5>
            <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              {{ t('total') }}
            </a>
          </div>
          <div class="flex-1 text-start items-center justify-between mb-2">
            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
              <li v-for="(item, index) in cart" :key="index" class="py-2 sm:py-3">
                <div class="flex items-center justify-start space-x-4">
                  <p class="text-start text-sm">
                    {{ index + 1 }}
                  </p>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-gray-900 truncate dark:text-white mb-2" v-html="item.productName" />

                    <div class="text-xs items-center text-gray-700 truncate dark:text-white">
                      <div class="inline-flex rounded-md shadow-sm" role="group">
                        <button type="button" class="inline-flex dark:hover:bg-red-500 focus:bg-red-500 px-1 py-1 items-center text-sm text-gray-900 bg-transparent border border-gray-200 rounded-l-lg hover:bg-red-500 hover:text-white focus:z-10 focus:ring-0  dark:border-white dark:text-white dark:hover:text-white  dark:focus:bg-red-700" @click.prevent="decreaseQty(item)">
                          <Icon name="subtract" size="20" />
                        </button>

                        <button type="button" class="inline-flex dark:hover:bg-blue-500 focus:bg-blue-500 px-1 py-1 items-center text-sm text-gray-900 bg-transparent border border-gray-200 rounded-r-lg hover:bg-blue-500  hover:text-white focus:z-10 focus:ring-0  dark:border-white dark:text-white dark:hover:text-white  dark:focus:bg-blue-700" @click.prevent="increaseQty(item)">
                          <Icon name="add" size="20" />
                        </button>
                      </div>
                      <span class="ml-10">{{ item.quantity }} x {{ AppHelper.formatCurrency(item.salePrice) }}</span>
                    </div>
                  </div>
                  <div class="inline-flex text-sm items-center font-bold text-gray-900 dark:text-white">
                    {{ AppHelper.formatCurrency(item.quantity * item.salePrice) }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex text-center justify-between font-bold items-center mb-5">
        <p>{{ t('grand_total') }}</p>
        <p>{{ AppHelper.formatCurrency(grandTotal) }}</p>
      </div>
      <div class="w-full text-start justify-between items-center mb-5">
        <SharedInput v-model="phone" type="text" :label="`${t('phone')} *`" :placeholder="t('phone')" @input="AppHelper.formatPhoneNumber(phone)" />
        <SharedTextarea v-model="address" type="text" :label="t('address')" :placeholder="t('optional')" />
      </div>
      <SharedButtonCustom :label="`${t('place_order')}`" class="w-full" @click="submitOrder" />
    </template>
  </SharedModal>
  <!-- End Modal Cart item  -->
</template>
