import { createContext } from "react";
import { createPortal } from "react-dom";

import { getValidObjectValue } from "../../utils";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./index.module.css";

export const ModalContext = createContext({
  onHide: () => {},
});

const Modal = ({
  onHide,
  center,
  classes,
  children,
  staticBack = false,
  scroll = false,
  show = false,
  ...rest
}) => {
  let root = getValidObjectValue("root", classes);
  let dialog = getValidObjectValue("dialog", classes);
  let content = getValidObjectValue("content", classes);

  return createPortal(
    <>
      {show && (
        <div
          onClick={staticBack ? () => {} : onHide}
          className={`${styles.Root} ${root}`}
          {...rest}
        >
          <ModalContext.Provider value={{ onHide: onHide }}>
            <div
              onClick={(e) => e.stopPropagation()}
              className={`${styles.Dialog} ${center ? styles.Centered : ""} ${
                scroll ? styles.Scroll : ""
              } ${dialog}`}
            >
              <div className={`${styles.Content} ${content}`}>{children}</div>
            </div>
          </ModalContext.Provider>
        </div>
      )}
    </>,
    document.getElementById("modal-wrapper")
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
