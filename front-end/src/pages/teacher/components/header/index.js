import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BsBoxArrowRight, BsPeopleCircle } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

import {
  ADMIN_ROUTES,
  TEACHER_ROUTES,
  USER_ROUTES,
} from "../../../../routes/meta-data";
import { teacherSignOut } from "../../../../store/teacher/auth/actions";
import styles from "./Index.module.css";

const Header = () => {
  const rdxDispatch = useDispatch();
  const { teacher } = useSelector((state) => state.teacherAuth);

  const signOutHandler = () => {
    rdxDispatch(teacherSignOut());
  };

  return (
    <header className={`sticky-top bg-dark text-white shadow-sm`}>
      <div className={`container`}>
        <div
          className={`d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start`}
        >
          <NavLink
            to={TEACHER_ROUTES.home.path}
            className={`fs-4 d-flex align-items-center my-2 my-sm-0 me-sm-auto text-white text-decoration-none`}
            exact
          >
            Teacher
          </NavLink>
          <ul
            className={`nav col-12 col-sm-auto my-2 justify-content-center my-sm-0 text-small`}
          >
            <li>
              <NavLink
                to={ADMIN_ROUTES.dashboard.path}
                className={`nav-link ${styles.Link}`}
                activeClassName="text-danger"
                exact
              >
                <BsPeopleCircle
                  className={`${styles.Icon} d-block mx-auto mb-1`}
                />
                Admin
              </NavLink>
            </li>
            <li>
              <NavLink
                to={USER_ROUTES.home.path}
                className={`nav-link ${styles.Link}`}
                activeClassName="text-danger"
                exact
              >
                <FiUsers className={`${styles.Icon} d-block mx-auto mb-1`} />
                Pupils
              </NavLink>
            </li>
            <li>
              <span
                className={`nav-link ${styles.Link}`}
                onClick={signOutHandler}
              >
                <BsBoxArrowRight
                  className={`${styles.Icon} d-block mx-auto mb-1`}
                />
                Sign Out ({teacher.forename})
              </span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
