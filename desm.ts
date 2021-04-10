// from https://github.com/mcollina/desm/blob/master/index.js
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

function urlDirname(url: string | URL) {
  return dirname(fileURLToPath(url))
}

function urlJoin(url: string | URL, ...str: string[]) {
  return join(urlDirname(url), ...str)
}

export default urlDirname

export { urlJoin as join, urlDirname as dirname }
