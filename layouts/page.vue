<script setup lang="ts">

</script>

<template>
  <div class="dark:bg-dim-900 mx-auto container">
    <LayoutNavbarAdmin />
    <LayoutSidebar />
    <div class="bg-white dark:bg-dim-900 h-screen mx-3">
      <slot />
    </div>
    <Snackbar />
  </div>
</template>
