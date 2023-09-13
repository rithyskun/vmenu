<script setup lang="ts">
import { onMounted, ref } from 'vue'

const no_image = './no-image.png'
const active = ref(0)
const banners = ref([
  {
    index: 1,
    imageUrl: 'https://picsum.photos/200/300',
  },
  {
    index: 2,
    imageUrl: 'https://picsum.photos/id/237/200/300',
  },
  {
    index: 3,
    imageUrl: 'https://picsum.photos/seed/picsum/200/300',
  },
])

const onLoad = () => {
  let i = 0
  setInterval(() => {
    if (i > banners.value.length - 1)
      i = 0

    active.value = i
    i++
  }, 5000)
}
onMounted(() => {
  onLoad()
})
</script>

<template>
  <div class="relative overflow-hidden rounded-lg md:h-96">
    <div
      v-for="(img, index) in 10"
      :id="`slide-${index}`"
      :key="img.index"
      :class="`${active === index ? 'left-0' : 'left-full'}`"
      class="carousel-item w-full inset-0 transform px-5 transition-all duration-500 ease-in-out"
    >
      <!-- <img
        class="h-[25vh] md:h-[45vh] w-96 items-center lg:w-full object-contain"
        :src="img.imageUrl || no_image"
        alt=""
      > -->
      <NuxtImg
        class="h-[25vh] md:h-[45vh] w-96 items-center lg:w-full object-contain"
        :src="`https://swiperjs.com/demos/images/nature-${img}.jpg`"
      />
    </div>
  </div>
</template>
