import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  content: [
    './app.vue',
    './app/**/*.{vue,ts}',
    './components/**/*.{vue,ts}',
    './pages/**/*.{vue,ts}'
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: colors.green
      }
    }
  }
}
