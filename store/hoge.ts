import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application

type State = {
  title: string
  description: string
}

export const useHoge = defineStore('hoge', {
  state: (): State => ({ title: '', description: '' }),

  actions: {
    updateTitle(title: string) {
      this.title = title
    },
    updateDescription(description: string) {
      this.description = description
    },
  },
})
