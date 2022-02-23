import randomInteger from "random-int";
import React, { createContext, useState } from "react";
import { ResultScreen } from "../components/results";

export const GameContext = createContext({
  state: {
    solution: { get: '', set: (value) => { } }, hints: { get: [], set: (value) => { } }, rows: { get: [], set: (value) => { } }, paused: { get: '', set: (value) => { } },
    resultsOpen: { get: '', set: (value) => { } }, won: { get: '', set: (value) => { } }, ended: { get: '', set: (value) => { } },
    correctLetters: { get: [], set: (value) => { } },
    wrongLetters: { get: [], set: (value) => { } },
    missLetters: { get: [], set: (value) => { } },
    currentWord: { get: '', set: (value) => { } },
  },
  words: { get: '', set: (value) => { } },

});

const GameContextProvider = (props) => {
  const r = randomInteger(0, props.words.answers.length);
  const [hints, setHints] = useState(['', '', '', '', '', ''])
  const [rows, setRows] = useState(['', '', '', '', '', ''])
  const [paused, setPaused] = useState(false)
  const [won, setWon] = useState(false)
  const [ended, setEnded] = useState(false)
  const [solution, setSolution] = useState(props.words.answers[r])
  const [words, setWords] = useState([...props.words.guesses, ...props.words.answers])
  const [resultsOpen, setResultsOpen] = useState(false)

  const [wrongLetters, setWrongLetters] = useState([])
  const [missLetters, setMissLetters] = useState([])
  const [correctLetters, setCorrectLetters] = useState([])
  const [currentWord, setCurrentWord] = useState('')

  const newWord = () => {
    const r = randomInteger(0, props.words.answers.length);
    setSolution(props.words.answers[r])
  }

  return (
    <GameContext.Provider
      value={{
        words: { get: words, set: setWords },
        state: {
          correctLetters: { get: correctLetters, set: setCorrectLetters },
          missLetters: { get: missLetters, set: setMissLetters },
          wrongLetters: { get: wrongLetters, set: setWrongLetters },
          currentWord: { get: currentWord, set: setCurrentWord },
          rows: { get: rows, set: setRows }, solution: { get: solution, set: setSolution }, paused: { get: paused, set: setPaused }, hints: { get: hints, set: setHints }, resultsOpen: { get: resultsOpen, set: setResultsOpen }, won: { get: won, set: setWon }, ended: { get: ended, set: setEnded }
        }
      }}
    >
      {props.children}

      <ResultScreen
        gameEnded={ended}
        gameWon={won}
        newGame={() => {
          newWord()
          setEnded(false)
          setPaused(false)
          setWon(false)
          setRows(['', '', '', '', '', ''])
          setHints(['', '', '', '', '', ''])
          setCorrectLetters([])
          setWrongLetters([])
          setMissLetters([])
          setCurrentWord('')
        }}
        tries={0}
        size={5}
        answer={solution}
        hints={hints}
      />

    </GameContext.Provider>
  );
};

export default GameContextProvider;