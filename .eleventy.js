const
  dev = global.dev = (process.env.ELEVENTY_ENV === 'development'),
  now = new Date()
  CONTENT_GLOBS = {
    posts: 'src/articles/*.md',
    experiences: 'src/experiences/*.md',
    work: 'src/work/*.md'
  }

module.exports = config => {
  /* --- PLUGINS --- */
  // navigation
  // config.addPlugin( require('@11ty/eleventy-navigation'))

  /* --- FILTERS --- */
  // format dates
  // const dateformat = require('./lib/filters/dateformat')
  // config.addFilter('datefriendly', dateformat.friendly)
  // config.addFilter('dateymd', dateformat.ymd)

  // format word count and read time
  // config.addFilter('readtime', require('./lib/filters/readtime'))
  
  /* --- SHORTCODES --- */
  // page navigation
  // config.addShortcode('navlist', require('./lib/shortcodes/navlist'))

  // CSS processing
  config.addTransform('postcss', require('./lib/transforms/postcss'))
  config.addWatchTarget('./src/assets/scss/')

  // minify HTML
  config.addTransform('htmlminify', require('./lib/transforms/htmlminify'))

  // inline assets
  config.addTransform('inline', require('./lib/transforms/inline'))

  // js watcher
  config.addWatchTarget('./src/js/')
  config.addWatchTarget('./src/images/')

  // passthrough
  config.addPassthroughCopy({'./node_modules/alpinejs/dist/alpine.js': './js/alpine.js'})
  config.addPassthroughCopy('src/assets/fonts')
  config.addPassthroughCopy('src/images')

  // Collections: Posts
  config.addCollection('posts', collection => 
    collection
      .getFilteredByGlob(CONTENT_GLOBS.posts)
      .filter(p => dev || (!p.data.draft && p.date <= now))
  )

  // Collections: Experience
  config.addCollection('experiences', collection => 
    collection
      .getFilteredByGlob(CONTENT_GLOBS.experiences)
      .sort((a, b) => {
        return a.data.order - b.data.order
      })
  )

  // 11ty defaults
  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: 'data',
      includes: 'includes',
      layouts: 'layouts',
    }
  }
}