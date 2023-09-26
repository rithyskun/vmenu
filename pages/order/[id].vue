<script setup lang="ts">
import { useCartStore } from '../../stores/carts'
import { AppHelper } from '~/server/utils/helper'
const store = useCartStore()

const order = computed(() => {
  return store.order
})

const modal = ref<boolean>(false)

const closeModal = () => {
  modal.value = false
}

const { t } = useI18n()

const formTitle = computed(() => {
  return t('order_detail')
})

const total = computed(() => {
  return store.getTotalInOrder
})
onMounted(() => {
  modal.value = true
})
</script>

<template>
  <!-- Modal Cart Item  -->
  <SharedModal v-show="modal" @close="closeModal">
    <template #header>
      {{ formTitle }}
    </template>
    <template #body>
      <div id="cart-item" name="cart-item">
        <div class="w-full p-2 dark:bg-gray-500 dark:border-gray-700">
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
              <li v-for="(item, index) in order" :key="index" class="py-2 sm:py-3">
                <div class="flex items-center justify-start space-x-4">
                  <p class="text-start text-sm">
                    {{ index + 1 }}
                  </p>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-gray-900 truncate dark:text-white mb-2" v-html="item.product.productName" />

                    <div class="text-xs items-center text-gray-700 truncate dark:text-white">
                      {{ item.quantity }} x {{ AppHelper.formatCurrency(item.salePrice) }}
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
        <p>{{ AppHelper.formatCurrency(total) }}</p>
      </div>
      <div class="w-full text-start justify-between items-center mb-5">
        <SharedInput value="phone" disabled type="text" :label="`${t('phone')} *`" :placeholder="t('phone')" />
        <SharedTextarea value="address" disabled type="text" :label="t('address')" :placeholder="t('optional')" />
      </div>
      <SharedButtonCustom :label="`${t('close')}`" class="w-full" />
    </template>
  </SharedModal>
  <!-- End Modal Cart item  -->
</template>
