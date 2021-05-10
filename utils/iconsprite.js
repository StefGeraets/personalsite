const fs = require('fs')
const path = require('path')
const util = require('util')
const glob = require('glob')
const File = require('vinyl')
const SVGSpriter = require('svg-sprite')
const { resolve } = require('path')

const cwd = path.resolve('src/assets/icons')
const spriteConfig = {
  mode: {
    inline: true,
    symbol: {
      sprite: 'sprite.svg',
      example: false
    }
  },
  shape: {
    transform: ['svgo'],
    id: {
      generator: 'icon-%s'
    }
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false
  }
}

module.exports = async () => {
  const spriter = new SVGSpriter(spriteConfig)

  const compileSprite = async (args) => {
    return new Promise((resolve, reject) => {
      spriter.compile(args, (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result.symbol.sprite)
      })
    })
  }

  const getFiles = util.promisify(glob)
  const files = await getFiles('**/*.svg', { cwd: cwd })

  files.forEach(function (file) {
    spriter.add(
      new File({
        path: path.join(cwd, file),
        base: cwd,
        contents: fs.readFileSync(path.join(cwd, file))
      })
    )
  })

  const sprite = await compileSprite(spriteConfig.mode)
  const spriteContent = sprite.contents.toString('utf8')

  return spriteContent
}