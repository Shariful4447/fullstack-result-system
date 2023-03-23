import { useCallback, useEffect, useState } from "react";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import qs from "query-string";

import {
  deleteTest,
  fetchingTests,
  userErrorRemove,
} from "../../../store/teacher/tests/actions";
import { getValidObjectValue } from "../../../shared/utils";
import TableBox from "../../../shared/components/table-box";
import AlertDismissible from "../../../shared/components/alert/Dismissible";
import Confirmation from "../../../shared/components/confirmation";
import IconButton from "../../../shared/components/button/icon-button/IconButton";
import SubHeader from "../components/header/SubHeader";
import AddTest from "../components/add-test";
import EditTest from "../components/edit-test";
import styles from "./Index.module.css";

const AllTests = () => {
  const { pathname, search } = useLocation();
  const { push } = useHistory();
  const params = useParams();
  const rdxDispatch = useDispatch();
  const { status, data, error } = useSelector((state) => state.teacherTests);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const qsResult = qs.parse(search);
  const subjectId = getValidObjectValue("subjectId", params);
  const className = getValidObjectValue("class", qsResult)
    ? `(Class: ${qsResult.class.toUpperCase()} - `
    : "";
  const subjectName = getValidObjectValue("subject", qsResult)
    ? `Subject: ${qsResult.subject.toUpperCase()})`
    : "";
  const label = `Test List ${className}${subjectName}`;

  const onHide = useCallback(() => {
    setEditItem(null);
  }, []);

  const onDelete = async () => {
    await rdxDispatch(
      deleteTest(subjectId, deleteItem.id, () => {
        setDeleteItem(null);
      })
    );
  };

  useEffect(() => {
    if (subjectId) {
      rdxDispatch(fetchingTests(subjectId));
    }
  }, [rdxDispatch, subjectId]);

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
      <TableBox className="alert alert-danger" title={label}>
        <ul className={`m-0`}>
          {error.fetched.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
      </TableBox>
    );
  }

  if (status.fetched === "complete" && !data.length) {
    return (
      <TableBox className="alert alert-danger" title={label}>
        <p className="text-danger m-0">
          No tests <span className="fw-bolder">found</span>
        </p>
      </TableBox>
    );
  }

  return (
    <TableBox title={label}>
      {editItem && (
        <EditTest
          data={{
            ...editItem,
          }}
          subjectId={subjectId}
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
              onHide={() => rdxDispatch(userErrorRemove("delete"))}
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
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={d.id}>
                <th scope="row">{index + 1}</th>
                <td>{d.name}</td>
                <td>{d.test_date}</td>
                <td className={`${styles.Actions}`}>
                  <IconButton
                    variant="primary"
                    className={`fs-4`}
                    onClick={() => {
                      push(`${pathname}/test/${d.id}`);
                    }}
                  >
                    <FiEye />
                  </IconButton>
                  <IconButton
                    className={`ms-2 fs-4`}
                    variant="warning"
                    onClick={() =>
                      setEditItem({ id: d.id, name: d.name, date: d.test_date })
                    }
                  >
                    <FiEdit />
                  </IconButton>
                  <IconButton
                    variant="danger"
                    className={`ms-2 fs-4`}
                    onClick={() => setDeleteItem({ id: d.id, name: d.name })}
                  >
                    <FiTrash />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableBox>
  );
};

const Test = () => {
  return (
    <>
      <SubHeader>Tests</SubHeader>
      <AddTest />
      <AllTests />
    </>
  );
};

export default Test;
