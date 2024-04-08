import fs from 'fs'

export default function copyFile(moduleOptions) {
  const { from, to } = moduleOptions;

  this.nuxt.hook('ready', async nuxt => {
    console.log(`> Copying file: \n [from: ${from}] \n [to: ${to}] \n`)

    fs.copyFile(from, to, (err) => {
      if (err) throw err;
    });
  })

}

// REQUIRED if publishing the module as npm package
// module.exports.meta = require('../../../attendees/package.json')
