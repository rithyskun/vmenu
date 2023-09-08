<script setup lang="ts">
const colorMode = useColorMode()
const onClick = () => {
  const values = ['system', 'light', 'dark']
  const index = values.indexOf(colorMode.preference)
  const next = (index + 1) % values.length

  colorMode.preference = values[next]
}
</script>

<template>
  <button aria-label="Color Mode" class="hover:text-cyan-500 dark:text-yellow-400" @click="onClick">
    <Icon v-if="colorMode.preference === 'dark'" size="16" name="carbon:moon" />
    <Icon v-else-if="colorMode.preference === 'light'" size="16" name="carbon:light" />
    <Icon v-else size="16" name="carbon:screen" />
  </button>
</template>
