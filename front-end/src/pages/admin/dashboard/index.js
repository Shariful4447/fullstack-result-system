import { memo } from "react";
import { Link } from "react-router-dom";
import { TEACHER_ROUTES, USER_ROUTES } from "../../../routes/meta-data";

const Dashboard = () => {
  return (
    <div>
      <div className="round-1 border p-3">
        <h1 className="text-primary">welcome to Admin</h1>
        <div className="d-flex align-items-center justify-content-end">
          <Link
            className="btn btn-danger me-3"
            style={{ width: "max-content" }}
            to={TEACHER_ROUTES.home.path}
          >
            Go to Teacher
          </Link>
          <Link
            className="btn btn-danger me-3"
            style={{ width: "max-content" }}
            to={USER_ROUTES.home.path}
          >
            Go to Pupil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Dashboard);
