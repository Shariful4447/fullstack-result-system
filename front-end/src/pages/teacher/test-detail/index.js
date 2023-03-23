import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useParams } from "react-router-dom";

import { getValidObjectValue } from "../../../shared/utils";
import {
  deletePupilTestGrade,
  fetchingPupilTestGrade,
  testPupilGradeErrorRemove,
} from "../../../store/teacher/test-pupil-grade/actions";
import AlertDismissible from "../../../shared/components/alert/Dismissible";
import Confirmation from "../../../shared/components/confirmation";
import SubHeader from "../components/header/SubHeader";
import IconButton from "../../../shared/components/button/icon-button/IconButton";
import AddGrade from "../components/add-grade";
import EditGrade from "../components/edit-grade";
import UploadGradeFile from "../components/upload-grade-file";
import styles from "./Index.module.css";

const AllPupils = ({ subjectId, testId }) => {
  const rdxDispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.teacherPupilTestGrade
  );
  const [editPupilGrade, setEditPupilGrade] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const onHide = () => {
    setEditPupilGrade(null);
  };

  const onDelete = async () => {
    await rdxDispatch(
      deletePupilTestGrade(deleteItem.id, () => {
        setDeleteItem(null);
      })
    );
  };

  useEffect(() => {
    if (subjectId && testId) {
      rdxDispatch(fetchingPupilTestGrade(subjectId, testId));
    }
  }, [rdxDispatch, subjectId, testId]);

  if (status.fetched === "idle") {
    return null;
  }

  if (status.fetched === "loading") {
    return (
      <div className={`rounded-1 border p-3 d-flex justify-content-center`}>
        <div className="spinner-grow text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status.fetched === "complete" && error.fetched) {
    return (
      <div className={`rounded-1 border p-3 alert alert-danger`} role="alert">
        <ul className={`m-0`}>
          {error.fetched.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (status.fetched === "complete" && !data.length) {
    return (
      <div className={`rounded-1 border p-3`}>
        <p className="text-danger m-0">
          No pupil <span className="fw-bolder">found</span> with associate test.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded border p-3`}>
      {editPupilGrade && (
        <EditGrade
          data={{
            id: editPupilGrade.id,
            name: editPupilGrade.name,
            grade: editPupilGrade.grade,
          }}
          onHide={onHide}
        />
      )}
      {deleteItem && (
        <Confirmation
          id={deleteItem.id}
          title={deleteItem.name}
          handler={onDelete}
          pending={status.delete === "loading"}
          onHide={() => {
            setDeleteItem(null);
          }}
        >
          {error.delete && (
            <AlertDismissible
              className="mb-3"
              onHide={() => rdxDispatch(testPupilGradeErrorRemove("delete"))}
            >
              <ul className={`m-0`}>
                {error.delete.map((el, index) => (
                  <li key={index}>{el}</li>
                ))}
              </ul>
            </AlertDismissible>
          )}
        </Confirmation>
      )}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Forename</th>
              <th scope="col">Surname</th>
              <th scope="col">Grade</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={d.id}>
                <th scope="row">{index + 1}</th>
                <td>{d.user.userid}</td>
                <td>{d.user.fname}</td>
                <td>{d.user.lname}</td>
                <td>{d.grade}</td>
                <td className={`${styles.Actions}`}>
                  <IconButton
                    className={`fs-4`}
                    variant="warning"
                    onClick={() =>
                      setEditPupilGrade({
                        id: d.id,
                        name: `${d.user.lname} (${d.user.userid})`,
                        grade: d.grade,
                      })
                    }
                  >
                    <FiEdit />
                  </IconButton>
                  <IconButton
                    variant="danger"
                    className={`ms-2 fs-4`}
                    onClick={() =>
                      setDeleteItem({
                        id: d.id,
                        name: `${d.user.lname} (${d.user.userid})`,
                      })
                    }
                  >
                    <FiTrash />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TestDetail = () => {
  const params = useParams();
  const subjectId = getValidObjectValue("subjectId", params);
  const testId = getValidObjectValue("testId", params);
  return (
    <>
      <SubHeader>Pupil Test Grades</SubHeader>
      <AddGrade subjectId={subjectId} testId={testId} />
      <UploadGradeFile subjectId={subjectId} testId={testId} />
      <AllPupils subjectId={subjectId} testId={testId} />
    </>
  );
};

export default TestDetail;
