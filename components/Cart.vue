<script setup lang="ts">
import { AppHelper } from '~/server/utils/helper'
import type { IProduct } from '~/types/types'
defineProps({
  products: Array as PropType<IProduct[]>,
})

const no_image = '/no-image.png'
</script>

<template>
  <div v-for="(item, index) in products" :key="index" class="group border rounded-lg p-1 relative border-gray-200 transition-all">
    <div
      class="rounded-lg hover:cursor-pointer dark:bg-gray-700 aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 lg:aspect-none"
    >
      <div>
        <NuxtImg :src="item?.productImage || no_image" class="md:h-44 rounded-lg h-36 brightness-75 bg-gradient-to-r from-cyan-500 opacity-95 w-96 object-cover object-center" alt="" />
      </div>
    </div>
    <div class="mt-2 flex justify-between">
      <div>
        <h3 class="text-sm absolute text-white ml-2 bottom-10 line-clamp-2 w-44 dark:text-gray-200">
          <a href="#">
            <span aria-hidden="true" />
            {{ item.productName }}
          </a>
        </h3>
        <p class="text-sm text-gray-500">
          <!-- discount -->
        </p>
      </div>
      <p class="text-sm font-medium text-gray-900 dark:text-white">
        {{ AppHelper.formatCurrency(item.salePrice) }}
      </p>
    </div>
  </div>
</template>
