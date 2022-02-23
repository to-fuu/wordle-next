import React, { useEffect, useImperativeHandle } from "react";
import { hintClass } from "../utils/utils";
import { motion, useAnimation } from "framer-motion";

export const Square = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    typeAnimation: () => {
      pressAnimation.start({
        scale: [0.5, 1],
        transition: { duration: 0.2, type: "ease" },
      });
    },
    revealAnimation: () => {
      pressAnimation.start({
        y: [-40, 0],
        transition: { duration: 0.2, type: "spring" },
      });
    },
  }));

  const pressAnimation = useAnimation();
  return (
    <motion.div
      animate={pressAnimation}
      className={`letter-case ${hintClass(props.hint)}`}
    >
      {props.letter || ""}
    </motion.div>
  );
});
