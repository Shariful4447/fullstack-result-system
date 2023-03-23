import { Link } from "react-router-dom";

import img from "../../assets/404.svg";
import styles from "./Index.module.css";

const NotFound = ({ path }) => {
  return (
    <div className={`${styles.Root}`}>
      <img src={img} alt="Page Not Found" className="img-fluid w-75" />
      <h1 className="text-danger mt-4">
        Page not <span className="fw-bolder">found</span>
      </h1>
      <p className="my-4 lead text-center">
        Oops! Looks like you followed a bad link. If you think this is a problem
        with us, please tell us.
      </p>
      <Link className="btn btn-danger" style={{width: "max-content"}} to={path}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
