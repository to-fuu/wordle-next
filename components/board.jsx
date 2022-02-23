import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import useDynamicRefs from "use-dynamic-refs";
import { Square } from "../components/square";
import { GameContext } from "../context/GameManagerContext";

export const Board = React.forwardRef((props, ref) => {
  const { state, words } = useContext(GameContext);
  const { solution } = state;
  const [size, setSize] = useState(5);
  const [currentRow, setCurrentRow] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const [getRef, setRef] = useDynamicRefs();
  const [lettersFound, setLettersFound] = useState([]);
  const [correctFound, setCorrectFound] = useState(["", "", "", "", ""]);
  const wingame = () => {
    state.won.set(true);
    state.ended.set(true);
  };

  const checkWord = () => {
    const fixedLetters = [];
    const word = state.rows.get[currentRow];
    let answerArray = solution.get.split("");

    if (props.hardMode) {
      for (let i = 0; i < size; i++) {
        if (correctFound[i] != "" && correctFound[i] != word[i]) {
          props.setError(
            `The letter ${String(
              correctFound[i]
            ).toUpperCase()} must be used at position ${i + 1}`
          );
          return;
        }
      }

      for (let i = 0; i < lettersFound.length; i++) {
        if (lettersFound[i] != "" && !word.includes(lettersFound[i])) {
          props.setError(`The letter ${lettersFound[i]} must be used`);
          return;
        }
      }
    }

    state.currentWord.set("");

    if (words.get.includes(word)) {
      const newHint = ["b", "b", "b", "b", "b", "b", "b", "b"];
      const wrong = [];
      const correct = [];
      const misplaced = [];

      const found = [];

      for (let i = 0; i < word.length; i++) {
        wrong.push(word[i]);
      }

      // We look for matches
      for (let i = word.length - 1; i >= 0; i--) {
        if (word[i] === solution.get[i]) {
          newHint[i] = "g";
          answerArray.splice(i, 1);
          fixedLetters[i] = solution.get[i];
          wrong = wrong.filter((l) => l !== word[i]);
          correct.push(word[i]);
          found.push(word[i]);
        }
      }

      // We look for misplaced letters
      for (let i = 0; i < word.length; i++) {
        if (answerArray.includes(word[i]) && newHint[i] !== "g") {
          newHint[i] = "y";
          answerArray.splice(answerArray.indexOf(word[i]), 1);
          wrong = wrong.filter((l) => l !== word[i]);
          misplaced.push(word[i]);
          found.push(word[i]);
        }
      }

      setLettersFound((prev) => [...prev, ...found]);

      setRevealing(true);
      let k = 0;
      const sol = correctFound;

      for (let i = 0; i < size; i++) {
        if (solution.get[i] == word[i]) {
          sol[i] = solution.get[i];
        }
      }

      setCorrectFound([...sol]);

      function myLoop() {
        setTimeout(function () {
          if (k == size) {
            setRevealing(false);
            if (word == solution.get) {
              wingame();
            } else {
              if (currentRow == 5) {
                state.ended.set(true);
                // props.updateScore(false);
              } else {
                setCurrentRow((prev) => prev + 1);
              }
            }
          } else {
            if (newHint[k] == "g") {
              state.correctLetters.set((prev) => [...prev, word[k]]);
            } else if (newHint[k] == "y") {
              state.missLetters.set((prev) => [...prev, word[k]]);
            } else if (newHint[k] == "b") {
              state.wrongLetters.set((prev) => [...prev, word[k]]);
            }

            getRef("row_" + currentRow).current.animateReveal(k);
            setRowHints(state.hints.get[currentRow] + newHint[k]);
          }
          k++;
          if (k <= size) {
            myLoop();
          }
        }, 200);
      }
      myLoop();
    } else {
      props.setError(`Couldn't recognize word 😳`);
      clearRow();
      return;
    }
  };

  const initGame = () => {
    state.correctLetters.set([]);
    state.wrongLetters.set([]);
    state.missLetters.set([]);
    state.currentWord.set("");

    for (let i = 0; i < 6; i++) {
      setRef("row_" + i);
    }

    setLettersFound([]);
    setCorrectFound(["", "", "", "", ""]);
    state.rows.set(["", "", "", "", "", ""]);
    state.hints.set(["", "", "", "", "", ""]);
    setCurrentRow(0);
    state.ended.set(false);
    state.won.set(false);
    setRevealing(false);
    state.paused.set(false);
  };

  useEffect(() => {
    props.setGlobalSize(size);
    initGame();
  }, [size]);

  useEffect(() => {
    if (state.ended.get) {
    }
  }, [state.ended.get]);

  const clearRow = () => {
    const _rows = state.rows.get;
    _rows[currentRow] = "";
    state.rows.set([..._rows]);
  };
  const setRowHints = (h) => {
    const _hints = state.hints.get;
    _hints[currentRow] = h;
    state.hints.set([..._hints]);
  };
  const clear = () => {
    initGame();
  };
  useImperativeHandle(ref, () => ({
    clear: () => {
      clear();
    },
    currentWord: () => state.rows.get[currentRow],
    answer: () => solution,
    size: () => size,
    gameEnded: () => state.ended.get,
    pause: () => {
      state.paused.set(true);
    },
    unpause: () => {
      state.paused.set(false);
    },
    insertKey: (k) => {
      if (state.ended.get || state.paused.get || revealing) return;
      const _rows = state.rows.get;
      if (_rows[currentRow].length == size) return;

      getRef("row_" + currentRow).current.animateType(_rows[currentRow].length);

      _rows[currentRow] += k;

      state.currentWord.set(_rows[currentRow]);

      state.rows.set([..._rows]);
    },
    deleteKey: () => {
      if (state.ended.get || state.paused.get || revealing) return;
      const _rows = state.rows.get;
      if (_rows[currentRow].length == 0) return;
      _rows[currentRow] = _rows[currentRow].slice(0, -1);
      getRef("row_" + currentRow).current.animateType(_rows[currentRow].length);

      state.currentWord.set(_rows[currentRow]);
      state.rows.set([..._rows]);
    },
    submit: async () => {
      if (state.ended.get || state.paused.get || revealing) return;
      if (state.rows.get[currentRow].length < size) {
        props.setError(`Word must be ${size} letters long 😬`);
      } else {
        checkWord();
      }
    },
    changeSize: async (size) => {
      setSize(size);
      clear();
    },
  }));

  return (
    <>
      {state.rows.get.length == 6 &&
        state.rows.get.map((_, i) => (
          <Row
            ref={getRef("row_" + i)}
            order={i}
            row={state.rows.get[i]}
            size={size}
            hints={state.hints.get[i]}
            key={`row_${i}`}
          />
        ))}
    </>
  );
});

const Row = React.forwardRef(({ row, size, hints, order }, ref) => {
  const [getRef, setRef] = useDynamicRefs();
  useEffect(() => {}, [row]);
  useImperativeHandle(ref, () => ({
    animateType: (i) => {
      getRef(`row_${order}_${i}`).current.typeAnimation();
    },
    animateReveal: (i) => {
      getRef(`row_${order}_${i}`).current.revealAnimation();
    },
  }));

  const cells = [];
  for (let i = 0; i < size; i++) {
    setRef(`row_${order}_${i}`);
    cells.push(i);
  }
  return (
    <div
      className={`grid gap-2 h-fit ${
        size == 5 ? "grid-cols-5" : size == 6 ? "grid-cols-6" : "grid-cols-7"
      }`}
    >
      {cells.map((_, i) => {
        return (
          <Square
            key={`case_${i}`}
            letter={row[i]}
            ref={getRef(`row_${order}_${i}`)}
            hint={hints[i]}
          />
        );
      })}
    </div>
  );
});
