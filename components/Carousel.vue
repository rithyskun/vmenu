<script setup lang="ts">
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
  <div class="relative overflow-hidden rounded-lg md:h-full md:mb-5">
    <div
      v-for="(img, index) in 10"
      :id="`slide-${index}`"
      :key="index"
      :class="`${active === index ? 'left-0' : 'left-full'}`"
      class="carousel-item w-full inset-0 transform px-5 transition-all duration-500 ease-in-out"
    >
      <NuxtImg
        class="h-[25vh] md:h-[35vh] w-96 items-center lg:w-full object-contain"
        :src="`https://swiperjs.com/demos/images/nature-${img}.jpg` || no_image"
      />
    </div>
  </div>
</template>
