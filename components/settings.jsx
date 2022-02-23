import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const isDark = () =>
  (localStorage && localStorage.wrodletheme === "dark") ||
  (!("wrodletheme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);

const isHard = () => localStorage && localStorage.hard === "true";

const getThemeString = (isDark) => (isDark ? "dark" : "light");
const getHardModeString = (hardMode) => (hardMode ? "true" : "false");

export const SettingsModal = ({ open, setIsOpen, hardMode, setHardMode ,board}) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setHardMode(isHard());
    setDark(isDark());
    toggleTheme(isDark());
  }, []);

  const toggleTheme = (value) => {
    localStorage.wrodletheme = getThemeString(!dark);
    if (localStorage.wrodletheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setDark(value);
  };

  const toggleHardMode = (value) => {
    localStorage.hard = getHardModeString(!hardMode);
    setHardMode(value);
    board.current?.clear()
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ bounce: 0 }}
          className="settings flex h-full justify-center items-center inset-0 fixed bg-black/20 px-4"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ bounce: 0 }}
            className="mx-auto max-w-lg bg-white dark:bg-gray-800 shadow-lg w-full rounded-lg p-6 flex flex-col gap-4"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>
            <div className="flex w-full justify-between">
              <div className="">
                <h2 className="text-lg font-medium">Hard Mode</h2>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  Any revealed hints must be used in subsequent guesses{" "}
                </p>
              </div>
              <label htmlFor="hardmode" className="w-8 h-5 relative group">
                <input
                  checked={hardMode}
                  onChange={(e) => {
                    toggleHardMode(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id="hardmode"
                  className="sr-only peer"
                />
                <div className="peer-checked:bg-emerald-600 w-full h-full bg-gray-400 absolute rounded-full pointer-events-none"></div>
                <div className="transition-transform w-4 h-4 rounded-full bg-white dark:bg-gray-900 absolute left-0.5 top-0.5 group-hover:scale-95 peer-checked:bg-white peer-checked:translate-x-3 pointer-events-none"></div>
              </label>
            </div>
            <div className="flex w-full justify-between">
              <div className="">
                <h2 className="text-lg font-medium">Dark Mode</h2>
              </div>
              <label htmlFor="darkmode" className="w-8 h-5 relative group">
                <input
                  checked={dark}
                  onChange={(e) => {
                    toggleTheme(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id="darkmode"
                  className="sr-only peer"
                />
                <div className="peer-checked:bg-emerald-600 w-full h-full bg-gray-400 absolute rounded-full pointer-events-none"></div>
                <div className="transition-transform w-4 h-4 rounded-full bg-white dark:bg-gray-900 absolute left-0.5 top-0.5 group-hover:scale-95 peer-checked:bg-white peer-checked:translate-x-3 pointer-events-none"></div>
              </label>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
