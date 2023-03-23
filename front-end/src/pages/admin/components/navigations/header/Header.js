import { useDispatch } from "react-redux";
import { FiMenu } from "react-icons/fi";
import { BsBoxArrowRight } from "react-icons/bs";
import { useLocation } from "react-router-dom";

import { ADMIN_ROUTES } from "../../../../../routes/meta-data";
import { adminSignOut } from "../../../../../store/admin/auth/actions";
import IconButton from "../../../../../shared/components/button/icon-button/IconButton";
import styles from "./Header.module.css";

const Header = ({ onToggle }) => {
  const rdxDispatch = useDispatch();
  const { pathname } = useLocation();

  const currentPath = Object.keys(ADMIN_ROUTES).find(
    (value) => ADMIN_ROUTES[value].path === pathname
  );

  const signOutHandler = () => {
    rdxDispatch(adminSignOut());
  };

  return (
    <header className={`px-3 ${styles.Root}`}>
      <IconButton className={`px-2 py-3 fs-3`} onClick={onToggle}>
        <FiMenu />
      </IconButton>
      {currentPath && (
        <h1 className={`ps-2 fs-4 ${styles.Title}`}>
          {ADMIN_ROUTES[currentPath].name}
        </h1>
      )}
      <ul className={`${styles.NavItems}`}>
        <li className={`${styles.NavItem}`}>
          <span
            className={`px-2 py-3 fs-3 ${styles.NavLink}`}
            style={{ cursor: "pointer" }}
            onClick={signOutHandler}
          >
            <BsBoxArrowRight />
          </span>
          {/* <NavLink
            to="2"
            className={`px-2 py-3 fs-3 ${styles.NavLink}`}
            activeClassName={`${styles.LinkActive}`}
            exact
          >
            <FiSettings />
          </NavLink> */}
        </li>
      </ul>
    </header>
  );
};

export default Header;
