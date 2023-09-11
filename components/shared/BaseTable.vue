<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  rows: () => [],
  perPage: 1,
  filterKey: '',
})

const emit = defineEmits(['rowClick', 'rowDBClick'])

export interface colDef {
  id: string
  text: string
  type?: string
}

interface Props {
  columns: Array<colDef>
  rows: Array<any>
  perPage?: number
  filterKey?: string
}

const { t } = useI18n()

const showEntries = ref([10, 15, 20, 'ALL'])
const page = ref<number>(1)
const perPages = ref(props.perPage)

const sortKey = ref<string>('')

const sortOrders = ref(Object.fromEntries(props.columns.map(key => [key.id, 1])))

// Filter Data
const filteredData = computed(() => {
  const filterKey = props.filterKey && props.filterKey.toLowerCase()
  const order = sortOrders.value[sortKey.value] || 1
  let data = props.rows

  if (filterKey) {
    data = data.filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().includes(filterKey)
      })
    })
  }

  if (sortKey.value) {
    data = data.slice().sort((a, b) => {
      a = a[sortKey.value]
      b = b[sortKey.value]
      return (a === b ? 0 : a > b ? 1 : -1) * order
    })
  }
  return data
})

// Paginate
const totalPage = computed(() => {
  return Math.ceil(filteredData.value.length / perPages.value)
})
const nextPage = () => {
  if (page.value < totalPage.value)
    page.value += 1
}

const backPage = () => {
  if (page.value !== 1)
    page.value -= 1
}

const paginatedData = computed(() => {
  if (String(perPages.value) === 'ALL')
    return filteredData.value
  else
    return filteredData?.value.slice((page.value - 1) * perPages.value, page.value * perPages.value)
})

// Sort by
const sortBy = (key: any) => {
  sortKey.value = key.id
  sortOrders.value[key.id] *= -1
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// row click
const rowClick = (item: string) => {
  emit('rowClick', item)
}

// row double click
const rowDBClick = (item: string) => {
  emit('rowDBClick', item)
}
</script>

<template>
  <div class="overflow-auto rounded-md-sm">
    <table v-if="paginatedData.length > 0" class="mx-auto w-full table-auto text-sm rounded-md">
      <thead>
        <tr
          class="border-b border-gray-600 bg-gray-100 text-center text-xs uppercase tracking-wide text-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <slot name="head">
            <th
              v-for="key in columns" :key="key.id"
              class="relative cursor-pointer select-none justify-between border px-2 py-2 dark:bg-gray-500"
              :class="{ active: sortKey === key.id }" @click="sortBy(key)"
            >
              <slot :name="`head.${key.id}`">
                {{ capitalize(key.text) }}
              </slot>
              <span class="arrow hover:cursor-pointer" :class="sortOrders[key.id] > 0 ? 'asc' : 'dsc'" />
            </th>
          </slot>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in paginatedData" :key="index"
          class="text-gray-800 relative group h-10 hover:bg-gray-200 hover:cursor-pointer dark:bg-gray-800 dark:text-white dark:hover:bg-gray-500"
          @click.prevent="rowClick(entry)"
          @dblclick.prevent="rowDBClick(entry)"
        >
          <slot name="item">
            <td v-for="key in columns" :key="key.id" class="border text-center">
              <slot :name="`${key.id}`" :item="entry">
                <span v-if="key.id === 'actions'"> ... </span>
                <span v-else>
                  {{ entry[key.id] }}
                </span>
              </slot>
            </td>
            <div class="opacity-0 text-xs group-hover:opacity-100 duration-300 absolute left-0 bottom-0 z-10 flex justify-center font-mono items-end bg-gray-200 text-blue-500 italic">
              {{ t('double_click_to_edit') }}
            </div>
          </slot>
        </tr>
      </tbody>
      <tfoot>
        <tr class="transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800">
          <slot name="foot" :item="columns">
            <td
              v-for="key in columns" :key="key.id"
              class="transition duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <slot :name="`foot.${key.id}`" :item="columns" />
            </td>
          </slot>
        </tr>
      </tfoot>
    </table>
    <p v-else class="dark:text-white">
      {{ t('data_not_found') }}
      <SharedSpinner />
    </p>

    <div v-if="paginatedData.length" class="flex justify-between py-2">
      <div class="flex items-center justify-start text-sm text-gray-600 dark:text-white">
        <span class="hidden md:block">
          {{ t('rows_per_page') }}
        </span>
        <select
          v-model="perPages"
          class="md:ml-1 rounded-md border py-1.5 border-gray-300 bg-white text-sm text-center hover:cursor-pointer hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-500 dark:text-white dark:hover:bg-gray-600"
          :class="page === totalPage ? 'hover:cursor-not-allowed' : ''" :disabled="page === totalPage"
        >
          <option v-for="select in showEntries" :key="select" :value="select">
            {{ select }}
          </option>
        </select>
      </div>
      <div class="flex items-center justify-end text-sm leading-tight text-gray-600 dark:text-white">
        <div class="text-gray-500 hidden md:block dark:text-white">
          {{ t('show') }} {{ paginatedData.length }} {{ t('of') }}
          {{ filteredData.length }}
          {{ t('records') }}
        </div>
        <a
          href="#" :class="page === 1 ? 'hover:cursor-not-allowed' : ''"
          class="ml-1 rounded-l border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-600 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-500 dark:text-white dark:hover:bg-gray-600"
          @click="backPage"
        >{{
          t('prev')
        }}</a>
        <a
          href="#" :class="page === totalPage ? 'hover:cursor-not-allowed' : ''"
          class="rounded-r border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-700 hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-500 dark:text-white dark:hover:bg-gray-600"
          @click="nextPage"
        >{{
          t('next')
        }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
th.active {
  color: rgb(41, 73, 215);
  background-color: rgb(230, 231, 226)
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid rgb(27, 25, 25);
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid rgb(27, 25, 25);
}
</style>
