import { useContext, useState } from "react";
import { BsArrowReturnLeft, BsEraserFill } from "react-icons/bs";
import { GameContext } from "../context/GameManagerContext";

const keyboard_row_1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const keyboard_row_2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const keyboard_row_3 = ["z", "x", "c", "v", "b", "n", "m"];

export const Keyboard = ({
  board,
  insert_key,
  delete_key,
  submit_word,
}) => {

  const { state } = useContext(GameContext);


  const hintKeyboardClass = (key) => {
    if (state.correctLetters.get.includes(key))
      return "!bg-green-600 !border-green-600 text-white";
    if (state.missLetters.get.includes(key))
      return "!bg-amber-500 !border-amber-500 text-white";
    if (state.wrongLetters.get.includes(key))
      return "!bg-gray-800 !border-gray-500 text-white opacity-30";
  };


  return board.current != null ? (
    <>
      <div className="keyboard p-4 space-y-1 w-screen md:max-w-xl mx-auto">
    
        <div className="flex gap-1">
          {keyboard_row_1.map((key) => (
            <button
              className={`kbd ${hintKeyboardClass(key)}`}
              onClick={() => {
                insert_key(key);
              }}
              key={key}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {keyboard_row_2.map((key) => (
            <button
              className={`kbd ${hintKeyboardClass(key)}`}
              onClick={() => {
                insert_key(key);
              }}
              key={key}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button
            disabled={state.currentWord.get.length < board.current.size()}
            onClick={() => {
              submit_word();
            }}
            className="disabled:opacity-50 disabled:bg-emerald-700 bg-emerald-700 text-white kbd hover:!shadow-emerald-900"
          >
            <BsArrowReturnLeft />
          </button>
          {keyboard_row_3.map((key) => (
            <button
              className={`kbd ${hintKeyboardClass(key)}`}
              onClick={() => {
                insert_key(key);
              }}
              key={key}
            >
              {key}
            </button>
          ))}

          <button
            disabled={state.currentWord.get.length == 0}
            onClick={() => {
              delete_key();
            }}
            className="disabled:opacity-50 disabled:bg-emerald-700 bg-emerald-700 text-white kbd hover:!shadow-emerald-900"
          >
            <BsEraserFill />
          </button>
        </div>
      </div>
   
    </>
  ) : (
    <></>
  );
};
