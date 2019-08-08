import { getMatchingLines, printLines } from './lib/lib'
import { wordIndex, vowelCount, lineCount, lines } from './config/config'

// Result:
// ​Red is a non-match
// Bold is a match
// Grey are non-considered lines

(function main() {
  const newLines = getMatchingLines(wordIndex, vowelCount, lineCount, lines)
  printLines(newLines)
})()