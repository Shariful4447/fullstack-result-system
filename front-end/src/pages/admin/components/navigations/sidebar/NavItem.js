import { NavLink } from "react-router-dom";

import { classNameGenerator } from "../../../../../shared/utils";
import styles from "./Sidebar.module.css";

const NavItem = ({
  children,
  icon,
  className,
  onClose,
  activeClassName,
  ...rest
}) => {
  return (
    <>
      <li
        onClick={() => {
          if (window.matchMedia("(max-width: 767px)").matches) onClose();
        }}
      >
        <NavLink
          className={`${styles.NavLink}${classNameGenerator(className)}`}
          activeClassName={`${styles.LinkActive}${classNameGenerator(
            activeClassName
          )}`}
          {...rest}
        >
          {icon}
          <span className={`ms-3 ${styles.NavLinkText}`}>{children}</span>
        </NavLink>
      </li>
    </>
  );
};
export default NavItem;
