import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

const SubItems = ({ data, icon, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <ul
      className={`${styles.SubItems} ${open ? styles.NavLinkClicked : ""}`}
      onClick={() => setOpen((prev) => !prev)}
    >
      <span className={`${styles.NavLink}`}>
        {icon}
        <span className={`mx-3 ${styles.NavLinkText}`}>{name}</span>
        <FiChevronRight />
      </span>
      {open && (
        <>
          {data.map((el, index) => (
            <li key={index}>
              <NavLink
                to={el.path}
                className={`${styles.SubItemLink}`}
                activeClassName={`${styles.LinkActive}`}
                exact
              >
                {el.name}
              </NavLink>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default SubItems;