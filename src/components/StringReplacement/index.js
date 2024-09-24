import {useState, useEffect} from 'react'

import './index.css'

const StringReplacement = () => {
  const [inputText, setInputText] = useState('')

  const [input1, setInput1] = useState('')

  const [input2, setInput2] = useState('')

  const [wordsCountX, setWordsCountX] = useState(0)

  const [characterCountX, setCharacterCount] = useState(0)

  const [showError, setShowError] = useState(false)

  const [nothingToReplace, setNothingToReplace] = useState(false)

  const onChangeInputText = event => {
    setInputText(event.target.value)
  }

  const onChangeInput1 = event => {
    setInput1(event.target.value)
  }

  const onChangeInput2 = event => {
    setInput2(event.target.value)
  }

  useEffect(() => {
    const one = inputText.toLowerCase().split(' ')
    const uniqueWords = new Set(one)
    uniqueWords.delete('')

    let noOfCharacters = inputText.match(/[0-9a-zA-Z]/g)

    noOfCharacters = noOfCharacters === null ? 0 : noOfCharacters.length

    document.title = `character count ${noOfCharacters} words count ${uniqueWords.size}`

    setWordsCountX(uniqueWords.size)
    setCharacterCount(noOfCharacters)
  }, [inputText])

  const onClickReplaceALlButton = () => {
    if (input1 !== '' && input2 !== '') {
      setShowError(false)
      const mapping = inputText
        .split(' ')
        .map(each => (each === input1 ? input2 : each))
      const ReplacedText = mapping.join(' ')
      if (ReplacedText === inputText) {
        setNothingToReplace(true)
      } else {
        setNothingToReplace(false)
      }

      setInputText(ReplacedText)
      setInput1('')
      setInput2('')
    } else {
      setShowError(true)
      setNothingToReplace(false)
    }
  }

  return (
    <div className="main-cont">
      <textarea
        cols={50}
        rows={10}
        className="input-text"
        onChange={onChangeInputText}
        value={inputText}
        placeholder="Enter Some Text"
      >
        {inputText}
      </textarea>
      <div className="sub-cont">
        <div className="replace-input-cont">
          <input
            className="input-string"
            value={input1}
            type="search"
            onChange={onChangeInput1}
            placeholder="Search"
          />
          <input
            type="text"
            className="input-string"
            onChange={onChangeInput2}
            value={input2}
            placeholder="Replace it with"
          />
        </div>
        <button
          onClick={onClickReplaceALlButton}
          className="replace-button"
          type="button"
        >
          Replace All
        </button>
      </div>
      {showError && (
        <p className="error-msg">*please provide the valuable texts</p>
      )}

      {nothingToReplace && (
        <p className="error-msg">*There is nothing to replace </p>
      )}

      <div className="count-conts">
        <h1 className="count-one">
          Unique Word Count:{' '}
          <span className="highlight-number">{wordsCountX}</span>
        </h1>
        <h1 className="count-one">
          Character Count:
          <span className="highlight-number">{characterCountX}</span>
        </h1>
      </div>
    </div>
  )
}

export default StringReplacement
