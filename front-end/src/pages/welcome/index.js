import { Link } from "react-router-dom";

import {
  ADMIN_ROUTES,
  TEACHER_ROUTES,
  USER_ROUTES,
} from "../../routes/meta-data";
import styles from "./index.module.css";

const Welcome = () => {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${styles.Root}`}
    >
      <div className={`${styles.Content}`}>
        <h1 className="fs-1 fw-bold text-center text-danger text-capitalize">
          Welcome to Grading System
        </h1>
        <p className={`text-dark pt-3 mb-3 ${styles.Para}`}>
          Grading System (GS) is a project for the final exam of Datenbankenud
          Web-Techniken. This Project is targeted for a school switches its
          grading system from paper to digital in order to have a better
          overview of the test results and the performance of all pupils. In
          this project, a simple system is developed where provided a simple and
          fast method for teachers to record the results of tests of all their
          pupils and also to get an overview of tests and subjects for both
          pupils and teachers with some basic export functionality.
        </p>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Login
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link className="dropdown-item" to={ADMIN_ROUTES.dashboard.path}>
                As Admin
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to={TEACHER_ROUTES.home.path}>
                As Teacher
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to={USER_ROUTES.home.path}>
                As Pupil
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
