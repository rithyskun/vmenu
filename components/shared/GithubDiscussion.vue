<script setup lang="ts">
import Giscus from "@giscus/vue";
</script>

<template>
    <Suspense>
    <Giscus
      id="comments"
      repo="rithyskun/rithyskun-blogs"
      repoId="R_kgDOIvEogA"
      category="General"
      categoryId="DIC_kwDOIvEogM4CTeiw"
      mapping="pathname"
      term="Welcome my blog discussion"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="preferred_color_scheme"
      lang="en"
      loading="lazy"
      crossorigin="anonymous"
    />
  </Suspense>
</template>
