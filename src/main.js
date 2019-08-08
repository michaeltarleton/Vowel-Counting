import { getMatchingLines, printLines } from './lib/lib'
import { wordIndex, vowelCount, lineCount, lines } from './config/config'

(function main() {
  const newLines = getMatchingLines(wordIndex, vowelCount, lineCount, lines)
  printLines(newLines)
})()