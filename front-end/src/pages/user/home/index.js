import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchingSubjectAverageGrade } from "../../../store/pupil/subject-average-grades/actions";
import TableBox from "../components/table-box";

const Home = () => {
  const rdxDispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.pupilSubjectAverageGrade
  );

  useEffect(() => {
    rdxDispatch(fetchingSubjectAverageGrade());
  }, [rdxDispatch]);

  if (status === "idle") {
    return null;
  }

  if (status === "loading") {
    return (
      <TableBox title="Average Grades">
        <div className={`d-flex justify-content-center`}>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </TableBox>
    );
  }

  if (status === "complete" && error) {
    return (
      <TableBox title="Average Grades">
        <div className={`alert alert-danger`} role="alert">
          <ul className={`m-0`}>
            {error.map((el, index) => (
              <li key={index}>{el}</li>
            ))}
          </ul>
        </div>
      </TableBox>
    );
  }

  return (
    <TableBox title="Average Grades">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Subject Name</th>
              <th scope="col">Average Grade</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td className="text-uppercase">{el.subject_name}</td>
                <td>{el.averageGrade}</td>
                <td>
                  <Link
                    to={`/pupil/${el.subject_id}`}
                    className={`btn btn-outline-info`}
                  >
                    More
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
