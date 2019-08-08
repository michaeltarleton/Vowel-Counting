import enums from '../config/enums'
import '../css/main.css'

export function getMatchingLines(wordIndex, vowelCount, lineCount, lines) {
  const newLines = [...lines]
  for (let i = lineCount - 1; i < newLines.length; i += lineCount) {
    newLines[i] = _matchWordsInLine(lines[i], wordIndex)
      .map(_checkIfWordMatchesVowelCriteria(vowelCount))
      .map(_addWordStylesAsNeeded)
  }
  return newLines
}

export function printLines(lines) {
  const body = document.querySelector('body')
  const lineContainer = document.createElement('ol')

  body.appendChild(lineContainer)

  lines.forEach(line => {
    lineContainer.appendChild(_generateLine(line))
  })
}

function _matchWordsInLine(line, wordIndex) {
  // Remove all punctuations and special characters to get just the plain words
  const wordArray = line.match(/[^\W]+/g)

  return wordArray.map((word, index) => {
    const isConsidered = (index + 1) % wordIndex === 0
    return {
      word,
      index,
      isConsidered,
    }
  })
}

function _checkIfWordMatchesVowelCriteria(vowelCount) {
  return function(wordObj) {
    const { word, isConsidered } = wordObj
    const isMatch = isConsidered ? _isWordMatched(word, vowelCount) : false
    return {
      ...wordObj,
      isMatch,
    }
  }
}

function _addWordStylesAsNeeded(wordObj) {
  const { word, isConsidered, isMatch } = wordObj
  const style = isConsidered ? _styleMatch(word, isMatch) : undefined
  return {
    ...wordObj,
    style,
  }
}

function _isWordMatched(word, vowelCount) {
  const matches = word.match(/[aeiou]/ig)
  return matches ? matches.length >= vowelCount : false
}

function _styleMatch(word, isMatch) {
  const wordElement = document.createElement('span')
  const className = isMatch ? enums.css.matchedWord : enums.css.nonMatchedWord

  wordElement.classList.add(className)
  wordElement.innerText = word

  return wordElement
}

function _generateLine(line) {
  const lineContainer = document.createElement('li')
  const lineChild = typeof line === 'string' ? _generateStringLine(line) : _generateArrayLine(line)
  lineContainer.appendChild(lineChild)
  return lineContainer
}

function _generateStringLine(line) {
  const span = document.createElement('span')
  span.classList.add(enums.css.nonConsideredLine)
  span.innerHTML = line
  return span
}

function _generateArrayLine(wordsArrayObj) {
  const span = document.createElement('span')

  for(let i in wordsArrayObj) {
    const wordObj = wordsArrayObj[i]
    const {isConsidered, word, style} = wordObj
    if(isConsidered) {
      span.appendChild(style)
    } else {
      span.innerHTML += word
    }

    // Add space to end of word
    span.innerHTML += ' '
  }

  // Trim last space
  span.innerHTML = span.innerHTML.trim()

  return span
}