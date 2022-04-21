<template>
  <div w="screen" h="screen" :style="{ 'background-color': bgColor }">
    <div>{{ set.toLowerCase() }}</div>
    <div>{{ a }}</div>
    <div>title: {{ hoge.title }}</div>
    <div>description: {{ hoge.description }}</div>
    <div>{{ { x, y } }}</div>
    <div>h:{{ Math.floor(h) }}</div>
    <input type="text" @input="onUpdateTitle" />
    <input type="text" @input="onUpdateDescription" />
    <div flex="~" space="x-2">
      <input v-model.number="hMax" type="number" />
      <input v-model.number="hMin" type="number" />
      <input v-model.number="factor" type="number" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useHoge } from '~~/store/hoge'

// props
type Props = {
  title: string
  description: string
}
const props = defineProps<Props>()

// constants & computed
const a = 'aaaa'
const set = computed(() => props.title + props.description)
const hoge = useHoge()
const { x, y } = useMouse()

const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0') // convert to Hex and prefix "0" if needed
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

const hMin = ref(0)
const hMax = ref(360)
const factor = ref(0.5)
const h = computed(() => {
  const diff = hMax.value - hMin.value
  const value = (x.value + y.value) * factor.value
  return value % (diff * 2) < diff
    ? hMin.value + (value % diff)
    : hMax.value - (value % diff)
})

const bgColor = computed(() => hslToHex(h.value, 80, 70))

// component state

// lifecycle
onBeforeMount(() => {
  hoge.updateTitle('before mount')
})

await new Promise((resolve) => {
  resolve(0)
})

onMounted(() => {
  hoge.updateDescription('mount')
})

// methods
const onUpdateTitle = ({ target }: InputEvent) => {
  if (!(target instanceof HTMLInputElement)) {
    return // or throw new TypeError();
  }
  hoge.updateTitle(target.value)
}
const onUpdateDescription = ({ target }: InputEvent) => {
  if (!(target instanceof HTMLInputElement)) {
    return // or throw new TypeError();
  }
  hoge.updateDescription(target.value)
}
</script>
