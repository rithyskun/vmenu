<script setup lang="ts">
import { useCartStore } from '~/stores/carts'
import { AppHelper } from '~/server/utils/helper'

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
      <form id="cart-item" name="cart-item">
        <div class="">
          <div class="w-full max-w-md dark:bg-gray-500 dark:border-gray-700">
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
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white" v-html="item.productName" />
                      <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                        {{ item.quantity }} x {{ AppHelper.formatCurrency(item.salePrice) }}
                        <span>
                          <Icon name="add" />
                          <Icon name="odd" />
                        </span>
                      </p>
                    </div>
                    <div class="inline-flex text-sm items-center font-semibold text-gray-900 dark:text-white">
                      {{ AppHelper.formatCurrency(item.quantity * item.salePrice) }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </template>

    <template #footer>
      <div class="flex text-center justify-between items-center mb-5">
        <p>{{ t('grand_total') }}</p>
        <p>{{ AppHelper.formatCurrency(grandTotal) }}</p>
      </div>
      <div class="w-full text-start justify-between items-center mb-5">
        <SharedInput v-model="phone" type="text" :label="`${t('phone')} *`" :placeholder="t('phone')" @input="AppHelper.formatPhoneNumber(phone)" />
        <SharedTextarea v-model="address" type="text" :label="t('address')" :placeholder="t('optional')" />
      </div>
      <SharedButtonCustom :disabled="loading" :label="`${t('place_order')}`" class="w-full" />
    </template>
  </SharedModal>
  <!-- End Modal Cart item  -->
</template>
