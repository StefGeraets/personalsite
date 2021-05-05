module.exports = config => {
  /* --- PLUGINS --- */
  // navigation
  config.addPlugin( require('@11ty/eleventy-navigation'))
  
  /* --- SHORTCODES --- */
  // page navigation
  config.addShortcode('navlist', require('./lib/shortcodes/navlist.js'))

  // 11ty defaults
  return {
    dir: {
      input: 'src',
      output: 'dist',
    }
  }
}