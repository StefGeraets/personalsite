const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdownIt = require('markdown-it')

const filters = require('./utils/filters.js')
const transforms = require('./utils/transforms.js')
const shortcodes = require('./utils/shortcodes.js')
const iconsprite = require('./utils/iconsprite.js')

const CONTENT_GLOBS = { experiences: 'src/experiences/*.md' }

module.exports = config => {
  
  // Plugins
  config.addPlugin(pluginRss)

  // Filters
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName])
  })
  
  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    config.addTransform(transformName, transforms[transformName])
  })

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    config.addShortcode(shortcodeName, shortcodes[shortcodeName])
  })

  // Icon Sprite
  config.addNunjucksAsyncShortcode('iconsprite', iconsprite)
  
  // Asset Watch Targets
  config.addWatchTarget('./src/assets')

  // Markdown
  config.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true
    })
  )
  
  // Layouts
  config.addLayoutAlias('base', 'base.njk')

  // Pass-through files
  config.addPassthroughCopy('src/robots.txt')
  config.addPassthroughCopy('src/site.webmanifest')
  config.addPassthroughCopy('src/assets/fonts')
  config.addPassthroughCopy('src/assets/images')
  config.addPassthroughCopy('src/assets/docs/Stef_Geraets-Senior_Front-end_Developer.pdf')

  // Deep-Merge
  config.setDataDeepMerge(true)

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
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}