import { createPortal } from "react-dom";

import { classNameGenerator } from "../../utils";
import styles from "./Backdrop.module.css";

const Backdrop = ({ className, open, clicked, children }) => {
  return createPortal(
    <>
      {open && (
        <section
          className={`${styles.Root}${classNameGenerator(className)}`}
          onClick={clicked}
        >
          {children}
        </section>
      )}
    </>,
    document.getElementById("backdrop")
  );
};

export default Backdrop;
