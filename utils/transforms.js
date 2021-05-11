const htmlmin = require('html-minifier')
const critical = require('critical')
const buildDir = 'dist'

const shouldTransformHTML = (outputPath) => {
  if (outputPath &&
  outputPath.endsWith('.html') &&
  process.env.ELEVENTY_ENV === 'production') {
    return true
  }
  return 
}

const isHomePage = (outputPath) => outputPath === `${buildDir}/index.html`

process.setMaxListeners(Infinity)
module.exports = {
  
  htmlmin: function (content, outputPath) {
    if (shouldTransformHTML(outputPath)) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: false,
        collapseWhitespace: true
      })
    }
    return content
  },

  critical: async function (content, outputPath) {
    if (shouldTransformHTML(outputPath) && isHomePage(outputPath)) {
      try {
        const config = {
          base: `${buildDir}/`,
          html: content,
          inline: true,
          width: 1280,
          height: 800,
          ignore: {
            atrule: ['@font-face'],
          }
        }
        const { html } = await critical.generate(config)
        return html
      } catch (err) {
        console.error(err)
      }
    }
    return content
  },

}