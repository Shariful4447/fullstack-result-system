import { useContext } from "react";
import { FiX } from "react-icons/fi";

import { ModalContext } from ".";
import { getValidObjectValue } from "../../utils";
import IconButton from "../button/icon-button/IconButton";
import styles from "./index.module.css";

const Header = ({ label, closeBtn, classes, closeProps, children }) => {
  const { onHide } = useContext(ModalContext);

  let root = getValidObjectValue("root", classes);
  let title = getValidObjectValue("title", classes);
  let close = getValidObjectValue("close", classes);

  let props = {};
  if (typeof closeProps === "object" && closeProps !== null) {
    props = closeProps;
  }

  return (
    <header className={`${styles.Header} ${root}`}>
      {label && <h5 className={`m-0 ${title}`}>{label}</h5>}
      {children}
      {closeBtn && (
        <IconButton className={`fs-3 ${close}`} variant="danger" onClick={onHide} {...props}>
          <FiX />
        </IconButton>
      )}
    </header>
  );
};

export default Header;
