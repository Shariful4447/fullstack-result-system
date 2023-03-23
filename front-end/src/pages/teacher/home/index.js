import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { fetchingAssignedSubject } from "../../../store/teacher/assigned-subjects/actions";
import TableBox from "../../../shared/components/table-box";
import styles from "./Index.module.css";

const Home = () => {
  const { pathname } = useLocation();
  const rdxDispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.teacherAssignedSubjects
  );

  useEffect(() => {
    (async () => {
      await rdxDispatch(fetchingAssignedSubject());
    })();
  }, [rdxDispatch]);

  if (status === "idle") {
    return null;
  }

  if (status === "loading") {
    return (
      <div className={`rounded-1 border p-3 d-flex justify-content-center`}>
        <div className="spinner-grow text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "complete" && error) {
    return (
      <TableBox className="alert alert-danger" title="Assigned Subjects">
        <ul className={`m-0`}>
          {error.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
      </TableBox>
    );
  }

  if (status === "complete" && !data.length) {
    return (
      <TableBox title="Assigned Subjects">
        <p className="text-danger m-0">
          No subjects <span className="fw-bolder">found</span>
        </p>
      </TableBox>
    );
  }

  return (
    <TableBox title="Assigned Subjects">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Class</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={d.id}>
                <th scope="row">{index + 1}</th>
                <td>{d.name}</td>
                <td>{d.class_name}</td>
                <td className={`${styles.Actions}`}>
                  <Link
                    to={`${pathname}/${d.id}/pupils?class=${d.class_name}&subject=${d.name}`}
                    className={`btn btn-link`}
                  >
                    Average Grades
                  </Link>
                  <Link
                    to={`${pathname}/${d.id}?class=${d.class_name}&subject=${d.name}`}
                    className={`btn btn-link ms-2`}
                  >
                    Tests
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableBox>
  );
};

export default Home;
