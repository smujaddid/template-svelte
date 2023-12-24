import sveltePreprocess from 'svelte-preprocess'
import postcss from './postcss.config.js'

export default {
  preprocess: sveltePreprocess({
    postcss
  })
}
