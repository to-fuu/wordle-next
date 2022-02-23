import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineRedo } from "react-icons/ai";

export const ResultScreen = ({
  gameEnded,
  newGame,
  gameWon,
  answer,
  tries,
  size,
  stats,
  hints,
  user,
}) => {
  return (
    <AnimatePresence>
      {gameEnded && (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ bounce: 0 }}
          className="settings flex h-full justify-center items-center inset-0 fixed bg-black/20"
          onClick={() => {}}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ bounce: 0 }}
            className="mx-auto max-w-md bg-white dark:bg-gray-800 shadow-lg  w-full rounded-lg overflow-clip flex flex-col"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="bg-gray-100 dark:bg-gray-700 py-4 dark:text-white text-xl font-bold text-center border-b dark:border-gray-600 text-black/80">
              {gameWon ? (
                <h1 className="">Game Won in {tries + 1} tries!</h1>
              ) : (
                <h1 className="">Try harder next time</h1>
              )}
            </div>

            {!gameWon && (
              <div className="text-center py-4 bg-red-500 text-white ">
                The answer was <strong className="uppercase">{answer}</strong>{" "}
              </div>
            )}
            {gameWon && (
              <div className="text-center py-2  bg-emerald-600 text-white ">
                The answer is <strong className="uppercase">{answer}</strong>{" "}
              </div>
            )}

            <div className="py-2 mx-auto">
              {hints.map((hint, i) => {
                const hintarray = [];
                for (let i = 0; i < size; i++) {
                  hintarray.push(hint[i]);
                }
                return (
                  <div
                    className={`grid p-0.5 mx-auto gap-1  ${
                      size == 5
                        ? "grid-cols-5"
                        : size == 6
                        ? "grid-cols-6"
                        : "grid-cols-7"
                    }`}
                    key={`row${i}_hints`}
                  >
                    {hintarray.map((h, hi) => {
                      const className = `${
                        h == "g"
                          ? "bg-emerald-500"
                          : h === "y"
                          ? "bg-amber-600"
                          : "bg-gray-400"
                      }`;
                      return (
                        <span
                          className={`w-3 h-3 ${className}`}
                          key={`row_${i}_hint${hi}`}
                        ></span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            {/* { stats && (
              <div className="grid grid-cols-2  dark:divide-gray-600 border-t dark:border-gray-600">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-600 border-r">
                  <span className="font-medium">Games Played</span>{" "}
                  <span className="text-2xl font-bold">{stats.games}</span>
                </div>

                <div className="flex justify-between  items-center p-4 border-b dark:border-gray-600">
                  <span className="font-medium">Current Streak</span>{" "}
                  <span className="text-2xl font-bold">{stats.streak}</span>
                </div>

                <div className="flex justify-between border-r items-center p-4">
                  <span className="font-medium">Games Won</span>{" "}
                  <span className="text-2xl font-bold">{stats.won}</span>
                </div>

                <div className="flex justify-between  items-center p-4">
                  <span className="font-medium">Best Streak Played</span>{" "}
                  <span className="text-2xl font-bold">{stats.hscore}</span>
                </div>
              </div>
            )} */}

            <div className="flex justify-between gap-4 p-4 dark:bg-gray-700 bg-gray-100 border-t dark:border-gray-600">
            
              <button
                onClick={() => {
                  newGame();
                }}
                className="flex-1 bg-emerald-600 py-2 rounded-md text-white font-medium inline-flex gap-2 items-center justify-center"
              >
                {" "}
                New Game <AiOutlineRedo className="text-2xl" />{" "}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
