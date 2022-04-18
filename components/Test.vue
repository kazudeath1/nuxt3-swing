<template>
  <div>
    <div>{{ set.toLowerCase() }}</div>
    <div>{{ a }}</div>
    <div>title: {{ hoge.title }}</div>
    <div>description: {{ hoge.description }}</div>
    <input type="text" @input="onUpdateTitle" />
    <input type="text" @input="onUpdateDescription" />
  </div>
</template>
<script setup lang="ts">
import { useHoge } from '~~/store/hoge'

// props
type Props = {
  title: string
  description: string
}
const { title, description } = defineProps<Props>()

// constants & computed
const a = 'aaaa'
const set = computed(() => title + description)
const hoge = useHoge()

// lifecycle
onBeforeMount(() => {
  hoge.updateTitle('before mount')
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
