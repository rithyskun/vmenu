<script setup lang="ts">
const cartItem = useCartItem()
</script>

<template>
  <NuxtLink to="cart" type="button" class="relative inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 hover:rounded-md dark:text-white ">
    <Icon name="cart" size="18" />
    <span class="sr-only">Cart</span>
    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-blue-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
      {{ cartItem }}
    </div>
  </NuxtLink>
</template>
