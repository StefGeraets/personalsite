const path = require('path')
const Image = require("@11ty/eleventy-img")

module.exports = {

  icon: function (name) {
    return `<svg class="icon icon--${name}" role="img" aria-hidden="true" width="24" height="24">
                <use xlink:href="#icon-${name}"></use>
            </svg>`
  },

  imageShortcode: async function(src, alt, width, sizes) {
    console.log(src)
    let metadata = await Image(src, {
      widths: [width, 600],
      formats: ["webp", "jpeg", "png"],
      urlPath: "/assets/images",
      outputDir: "./dist/assets/images"
    })

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    }

    return Image.generateHTML(metadata, imageAttributes, {
      filenameFormat: function(id, src, width, format, options) {
        const extension = path.extname(src)
        const name = path.basename(src, extension)

        return `${name}-${width}w.${format}`
      }
    })
  }
  
}