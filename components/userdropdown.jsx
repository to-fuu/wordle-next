import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineSliders,
  AiOutlineTrophy,
  AiOutlineUser
} from "react-icons/ai";
import { DeleteAuthCookie } from "../utils/cookies";
export const UserDropdown = ({
  loggedin,
  setStats,
  isAdmin,
  setLogin,
  setRegister,
}) => {
  const [open, setIsOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    document.addEventListener("click", () => {
      setIsOpen(false);
    });
    return () => {
      document.removeEventListener("click", () => {
        setIsOpen(false);
      });
    };
  }, []);
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!open);
        }}
        className="relative p-1 hover:bg-gray-200 rounded dark:hover:bg-gray-700 "
      >
        <AiOutlineUser />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -10,x:'calc(-100% + 32px)', opacity: 0 }}
            animate={{ y: 0,x:'calc(-100% + 32px)', opacity: 1 }}
            exit={{ y: -10,x:'calc(-100% + 32px)', opacity: 0 }}
            transition={{ bounce: 0, duration: 0.1 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white dark:bg-gray-800 dark:text-white shadow-lg p-2 rounded-md absolute mt-0 text-base min-w-[160px] text-left flex flex-col"
          >
            {loggedin ? (
              <>
                <button
                  onClick={() => {
                    setStats(true);
                  }}
                  className="px-1 py-1 hover:bg-gray-100 dark:hover:bg-gray-700  rounded flex gap-2 items-center sm:hidden"
                >
                  {" "}
                  <AiOutlineTrophy /> Stats
                </button>
                {isAdmin && (
                  <Link href="/admin" passHref>
                    <a className="px-1 py-1 hover:bg-gray-100 dark:hover:bg-gray-700  rounded flex gap-2 items-center">
                      {" "}
                      <AiOutlineSliders /> Dashboard
                    </a>
                  </Link>
                )}
                <button
                  onClick={() => {
                    DeleteAuthCookie();
                    router.reload();
                  }}
                  className="px-1 py-1 hover:bg-gray-100 rounded dark:hover:bg-gray-700  flex gap-2 items-center"
                >
                  <AiOutlineLogout /> Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setLogin(true);
                  }}
                  className="px-1 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex gap-2 items-center"
                >
                  <AiOutlineLogin /> Login
                </button>
                <button
                  onClick={() => {
                    setRegister(true);
                  }}
                  className="px-1 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex gap-2 items-center"
                >
                  <AiOutlineLogout /> Register
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
