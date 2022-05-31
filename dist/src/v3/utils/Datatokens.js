'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.generateDatatokenName = void 0
var words_json_1 = __importDefault(require('../data/words.json'))
function generateDatatokenName(wordList) {
  var list = wordList || words_json_1.default
  var random1 = Math.floor(Math.random() * list.adjectives.length)
  var random2 = Math.floor(Math.random() * list.nouns.length)
  var indexNumber = Math.floor(Math.random() * 100)
  var adjective = list.adjectives[random1].replace(/^\w/, function (c) {
    return c.toUpperCase()
  })
  var noun = list.nouns[random2].replace(/^\w/, function (c) {
    return c.toUpperCase()
  })
  var name = ''.concat(adjective, ' ').concat(noun, ' Token')
  var symbol = ''
    .concat(
      (adjective.substring(0, 3) + noun.substring(0, 3)).toUpperCase(),
      '-'
    )
    .concat(indexNumber)
  return { name: name, symbol: symbol }
}
exports.generateDatatokenName = generateDatatokenName
//# sourceMappingURL=Datatokens.js.map
