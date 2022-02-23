import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineQuestion, AiOutlineSetting } from 'react-icons/ai';
import { Board } from '../components/board';
import { HowToPlay } from '../components/howtoplay';
import { Keyboard } from '../components/keyboard';
import { SettingsModal } from '../components/settings';
import GameContextProvider, { GameContext } from '../context/GameManagerContext';

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
export default function Home({ words }) {

  const { state } = useContext(GameContext);

  const [showSettings, setShowSettings] = useState(false)
  const [error, setError] = useState('')
  const [showTutorial, setShowTutorial] = useState(true)
  const [hardMode, setHardMode] = useState(false)
  const [size, setSize] = useState(0)
  const board = useRef(null)




  useEffect(() => {
    if (error.length > 0) {
      setTimeout(() => {
        setError('')
      }, (1000));
    }
  }, [error])

  const insert_key = (key) => {
    if (showSettings || state.resultsOpen.get || showTutorial) return
    board.current.insertKey(key)
  }

  const delete_key = () => {
    if (showSettings || state.resultsOpen.get || showTutorial) return
    board.current.deleteKey()
  }

  const submit_word = () => {
    if (showSettings || state.resultsOpen.get || showTutorial) return
    board.current.submit()
  }

  const handleKeyDown = useCallback(
    (event) => {
      if (showSettings || state.resultsOpen.get || showTutorial) return
      const letter = event.key.toLowerCase()
      if (isLetter(letter)) {
        insert_key(letter)
      } else if (letter === 'enter') {
        submit_word()
        event.preventDefault()
      } else if (letter === 'backspace') {
        delete_key()
      }
    },
    [insert_key, submit_word, delete_key]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <GameContextProvider words={words.five}>
      <div className={`min-h-screen w-full  bg-gray-50 dark:bg-gray-900 transition-colors dark:text-white`}>
        <Head>
          <title>WordleX</title>
          <meta name="description" content="Unlimited WordleX" />
        </Head>
        <main className={` flex flex-col min-h-screen`}>
          <header className='border-b sticky top-0 bg-gray-50 dark:bg-gray-900 dark:border-b-gray-700 w-full grid grid-cols-3 justify-between items-center text-xl py-2 px-8'>
            <button onClick={() => {
              setShowTutorial(true)
            }} className="relative p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded mr-auto">
              <AiOutlineQuestion />
            </button>
            <h1 className='text-3xl font-bold tracking-widest ml-auto mr-auto relative text-center'>WORDLE Next {hardMode && <div className='transition-all bottom-0 inline-block translate-y-full md:translate-y-1/2 left-1/2 md:left-auto -translate-x-1/2 md:-rotate-3 text-sm font-normal absolute w-fit whitespace-nowrap  bg-gray-900 text-white dark:bg-gray-50 dark:text-black p-1 rounded'>Hard Mode</div>} </h1>
            <div className="flex gap-2 justify-end text-opacity-75">
            
              <button className="relative p-1 hover:bg-gray-200 dark:hover:bg-gray-700  rounded group" onClick={() => {
                setShowSettings(true)
              }}>
                <AiOutlineSetting className='group-hover:rotate-90 transition-transform duration-300' />
              </button>
            </div>
          </header>
          <div className="game flex justify-center items-center flex-1  flex-col gap-2 w-fit py-10 max-w-lg mx-auto">
            <Board ref={board} allWords={words}
              setError={setError}
              hardMode={hardMode}
              setGlobalSize={setSize}
            />
          </div>
          <Keyboard board={board} insert_key={insert_key} delete_key={delete_key} submit_word={submit_word}
            size={size}
          />
        </main>
        <SettingsModal open={showSettings} setIsOpen={setShowSettings} hardMode={hardMode} setHardMode={setHardMode} board={board} />
        <AnimatePresence>
          {error.length > 0 &&
            <motion.div initial={{ x: 'calc(-50% - 100px )', y: '-50%', opacity: 0 }} animate={{ x: '-50%', y: '-50%', opacity: 1 }} exit={{ x: 'calc(-50% + 100px )', y: '-50%', opacity: 0 }} transition={{ type: 'ease' }} className="p-4 bg-white dark:bg-gray-700 absolute border-l-[6px] border-red-500 top-1/2 left-1/2  shadow-lg dark:text-white  rounded-md text-lg font-medium">
              {error}
            </motion.div>}
        </AnimatePresence>
        <HowToPlay open={showTutorial} setIsOpen={setShowTutorial} />
      </div>
    </GameContextProvider>
  )
}

export async function getServerSideProps(ctx) {
  const wordlist = require("wordle-wordlist")

  const words = {
    five: {
      guesses: await wordlist.guesses(),
      answers: await wordlist.answers()
    },

  }

  return {
    props: {
      words,
    }
  }
}