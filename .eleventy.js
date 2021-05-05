const
  dev = global.dev = (process.env.ELEVENTY_ENV === 'development'),
  now = new Date()

module.exports = config => {
  /* --- PLUGINS --- */
  // navigation
  config.addPlugin( require('@11ty/eleventy-navigation'))

  /* --- FILTERS --- */
  // format dates
  const dateformat = require('./lib/filters/dateformat')
  config.addFilter('datefriendly', dateformat.friendly)
  config.addFilter('dateymd', dateformat.ymd)

  // format word count and read time
  config.addFilter('readtime', require('./lib/filters/readtime'))
  
  /* --- SHORTCODES --- */
  // page navigation
  config.addShortcode('navlist', require('./lib/shortcodes/navlist.js'))

  config.addCollection('post', collection => 
    collection
      .getFilteredByGlob('./src/articles/*.md')
      .filter(p => dev || (!p.data.draft && p.date <= now))
  )

  // 11ty defaults
  return {
    dir: {
      input: 'src',
      output: 'dist',
    }
  }
}