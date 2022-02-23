import { AnimatePresence, motion } from "framer-motion";
import { Square } from "../components/square";
export const HowToPlay = ({ open, setIsOpen }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ bounce: 0 }}
          className=" flex h-full justify-center items-center inset-0 fixed bg-black/20 max-h-screen z-[90] px-10"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ bounce: 0 }}
            className="mx-auto max-w-screen-sm  bg-white dark:bg-gray-800  shadow-lg w-full rounded-lg overflow-clip flex flex-col"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="bg-gray-100 dark:bg-gray-700 dark:text-white py-4 text-xl font-bold text-center border-b dark:border-gray-600 text-black/80">
              <h1 className="">HOW TO PLAY</h1>
            </div>

            <div className="max-h-[400px] md:max-h-[600px] overflow-y-auto">
              <div className="p-4 space-y-4 ">
                <p>
                  Guess the <strong>WORDLE</strong> in 6 tries
                </p>
                <p>
                  Each guess must be a valid 5 (or 6/7) letter word. Hit the enter
                  button to submit.
                </p>
                <p>
                  After each guess, the color of the tiles will change to show how
                  close your guess was to the word.
                </p>
              </div>
              <div className="p-4">
                <div className="text-lg font-medium">Examples</div>
                <div className="flex gap-2  mt-4">
                  <div className="animate-bounce">
                    <Square hint={"g"} letter="W" />
                  </div>
                  <div className="dark:border-2 dark:border-gray-700 rounded  ">
                    <Square letter="E" />
                  </div>
                  <div className="dark:border-2 dark:border-gray-700 rounded  ">
                    <Square letter="A" />
                  </div>
                  <div className="dark:border-2 dark:border-gray-700 rounded  ">
                    <Square letter="R" />
                  </div>
                  <div className="dark:border-2 dark:border-gray-700 rounded  ">
                    <Square letter="Y" />
                  </div>
                </div>
                <p className="mt-4">
                  The letter{" "}
                  <i>
                    <strong>W</strong>
                  </i>{" "}
                  is in the word and in the correct spot.
                </p>
                <div className="flex gap-2  mt-4">
                  <div className="dark:border-2 dark:border-gray-700 rounded  ">
                    <Square letter="P" />
                  </div>
                  <div className="animate-bounce">
                    <Square hint={"y"} letter="I" />
                  </div>
                  <div className="dark:border-2 dark:border-gray-700 rounded  ">
                    <Square letter="L" />
                  </div>
                  <div className="dark:border-2 dark:border-gray-700 rounded  ">
                    <Square letter="L" />
                  </div>
                  <div className="dark:border-2 dark:border-gray-700 rounded  ">
                    <Square letter="S" />
                  </div>
                </div>
                <p className="mt-4">
                  The letter{" "}
                  <i>
                    <strong>I</strong>
                  </i>{" "}
                  is in the word but in the wrong spot.
                </p>
                <div className="flex gap-2  mt-4">
                  <div className="dark:border-2 dark:border-gray-700 rounded  ">
                    <Square letter="V" />
                  </div>
                  <div className="dark:border-2 dark:border-gray-700 rounded  ">
                    <Square letter="A" />
                  </div>
                  <div className="dark:border-2 dark:border-gray-700 rounded  ">
                    <Square letter="G" />
                  </div>
                  <div className="animate-bounce">
                    <Square hint={"b"} letter="U" />
                  </div>
                  <div className="dark:border-2 dark:border-gray-700 rounded  ">
                    <Square letter="E" />
                  </div>
                </div>
                <p className="mt-4">
                  The letter{" "}
                  <i>
                    <strong>U</strong>
                  </i>{" "}
                  is not in the word in any spot.
                </p>
              </div>
            </div>

            <div className="flex justify-between gap-4 p-4 bg-gray-100 dark:border-gray-600 border-t dark:bg-gray-700">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex-1 bg-emerald-700 hover:bg-emerald-600 py-2 rounded-md text-white font-medium inline-flex gap-2 items-center justify-center"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
