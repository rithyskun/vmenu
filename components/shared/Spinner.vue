<script setup lang="ts">
const loading = isLoading()
</script>

<template>
  <div v-show="loading" class="inline-flex opacity-80 py-48 w-full flex-col items-center justify-center">
    <svg
      width="70" height="70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <g transform="translate(80 50)">
          <circle r="8" fill="#5E6C84" transform="scale(1 1)">
            <animateTransform
              attributeName="transform" type="scale" begin="-0.875s" values="1 1;1 1"
              keyTimes="0;1" dur="1s" repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite"
              values="1;0" begin="-0.875s"
            />
          </circle>
        </g>
      </g>
      <g>
        <g transform="rotate(45 -50.355 121.569)">
          <circle r="8" fill="#5E6C84" fill-opacity=".875" transform="scale(1 1)">
            <animateTransform
              attributeName="transform" type="scale" begin="-0.75s" values="1 1;1 1"
              keyTimes="0;1" dur="1s" repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite"
              values="1;0" begin="-0.75s"
            />
          </circle>
        </g>
      </g>
      <g>
        <g transform="rotate(90 -15 65)">
          <circle r="8" fill="#5E6C84" fill-opacity=".75" transform="scale(1 1)">
            <animateTransform
              attributeName="transform" type="scale" begin="-0.625s" values="1 1;1 1"
              keyTimes="0;1" dur="1s" repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite"
              values="1;0" begin="-0.625s"
            />
          </circle>
        </g>
      </g>
      <g>
        <g transform="rotate(135 -.355 41.569)">
          <circle r="8" fill="#5E6C84" fill-opacity=".625" transform="scale(1 1)">
            <animateTransform
              attributeName="transform" type="scale" begin="-0.5s" values="1 1;1 1"
              keyTimes="0;1" dur="1s" repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite"
              values="1;0" begin="-0.5s"
            />
          </circle>
        </g>
      </g>
      <g>
        <g transform="rotate(180 10 25)">
          <circle r="8" fill="#5E6C84" fill-opacity=".5" transform="scale(1 1)">
            <animateTransform
              attributeName="transform" type="scale" begin="-0.375s" values="1 1;1 1"
              keyTimes="0;1" dur="1s" repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite"
              values="1;0" begin="-0.375s"
            />
          </circle>
        </g>
      </g>
      <g>
        <g transform="rotate(-135 20.355 8.431)">
          <circle r="8" fill="#5E6C84" fill-opacity=".375" transform="scale(1 1)">
            <animateTransform
              attributeName="transform" type="scale" begin="-0.25s" values="1 1;1 1"
              keyTimes="0;1" dur="1s" repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite"
              values="1;0" begin="-0.25s"
            />
          </circle>
        </g>
      </g>
      <g>
        <g transform="rotate(-90 35 -15)">
          <circle r="8" fill="#5E6C84" fill-opacity=".25" transform="scale(1 1)">
            <animateTransform
              attributeName="transform" type="scale" begin="-0.125s" values="1 1;1 1"
              keyTimes="0;1" dur="1s" repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite"
              values="1;0" begin="-0.125s"
            />
          </circle>
        </g>
      </g>
      <g>
        <g transform="rotate(-45 70.355 -71.569)">
          <circle r="8" fill="#5E6C84" fill-opacity=".125" transform="scale(1 1)">
            <animateTransform
              attributeName="transform" type="scale" begin="0s" values="1 1;1 1"
              keyTimes="0;1" dur="1s" repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite"
              values="1;0" begin="0s"
            />
          </circle>
        </g>
      </g>
    </svg>
    <div class="font-sans text-xs dark:text-white">
      Loading...
    </div>
  </div>
</template>
