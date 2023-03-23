import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// import styles from "./Index.module.css";
import { pupilSignOut } from "../../../../store/pupil/auth/actions";
import {
  ADMIN_ROUTES,
  TEACHER_ROUTES,
  USER_ROUTES,
} from "../../../../routes/meta-data";

const Header = () => {
  const rdxDispatch = useDispatch();
  const { pupil } = useSelector((state) => state.pupilAuth);

  const signOutHandler = () => {
    rdxDispatch(pupilSignOut());
  };
  return (
    <header
      className={`sticky-top navbar navbar-expand-sm navbar-dark bg-primary`}
    >
      <div className="container">
        <NavLink className={`navbar-brand`} to={USER_ROUTES.home.path}>
          Pupil
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav ms-sm-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={ADMIN_ROUTES.dashboard.path}
              >
                Admin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={TEACHER_ROUTES.home.path}
              >
                Teacher
              </NavLink>
            </li>
            <li className="nav-item" style={{ cursor: "pointer" }}>
              <span className="nav-link" onClick={signOutHandler}>
                Sign Out ({pupil.forename} {pupil.surname})
              </span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
