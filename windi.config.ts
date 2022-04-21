import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  attributify: true,
  extract: {
    include: ['**/*.{vue,js,ts}'],
    exclude: ['node_modules', '.git'],
  },
})
