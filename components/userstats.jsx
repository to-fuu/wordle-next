import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineShareAlt } from "react-icons/ai";

export const UserStats = ({ open, setIsOpen, stats }) => {

  return stats != null ? (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ bounce: 0 }}
          className="settings flex h-full justify-center items-center inset-0 fixed bg-black/20"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ bounce: 0 }}
            className="mx-auto max-w-md bg-white dark:bg-gray-800 shadow-lg w-full rounded-lg overflow-clip flex flex-col"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="bg-gray-100 py-4 text-xl font-bold text-center  dark:bg-gray-700 dark:text-white text-black/80">
              <h1 className="">MY STATS</h1>
            </div>

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

            <div className="flex justify-between gap-4 p-4 dark:bg-gray-700 dark:border-gray-600 bg-gray-100 border-t ">
              <button className="flex-1 dark:bg-amber-600 dark:hover:bg-opacity-90 bg-amber-600 hover:bg-amber-500 py-2 rounded-md text-white font-medium inline-flex gap-2 items-center justify-center">
                Share
                <AiOutlineShareAlt className="text-2xl" />{" "}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex-1 dark:bg-red-500 dark:hover:bg-opacity-90 bg-red-700 hover:bg-red-600 py-2 rounded-md text-white font-medium inline-flex gap-2 items-center justify-center"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  ) : (
    <></>
  );
};
