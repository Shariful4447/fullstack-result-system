import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash } from "react-icons/fi";
import { BsFileEarmarkArrowDown } from "react-icons/bs";

import {
  archiveSubject,
  deleteSubject,
  fetchingSubjects,
  userErrorRemove,
} from "../../../store/admin/subjects/actions";
import Confirmation from "../../../shared/components/confirmation";
import AlertDismissible from "../../../shared/components/alert/Dismissible";
import IconButton from "../../../shared/components/button/icon-button/IconButton";
import AddSubject from "../components/add-subject";
import EditSubject from "../components/edit-subject";
import styles from "./Index.module.css";

const AllSubjects = () => {
  const rdxDispatch = useDispatch();
  const { status, data, error } = useSelector((state) => state.adminSubjects);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [archiveItem, setArchiveItem] = useState(null);

  const onHide = () => {
    setEditItem(null);
  };

  const onDelete = async () => {
    await rdxDispatch(
      deleteSubject(deleteItem.id, () => {
        setDeleteItem(null);
      })
    );
  };

  const onArchive = async () => {
    await rdxDispatch(
      archiveSubject(archiveItem.id, () => {
        setArchiveItem(null);
      })
    );
  };

  useEffect(() => {
    rdxDispatch(fetchingSubjects());
  }, [rdxDispatch]);

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
          No subjects <span className="fw-bolder">found</span>
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded border p-3`}>
      {editItem && (
        <EditSubject
          data={{
            id: editItem.id,
            name: editItem.name,
            className: editItem.className,
            teacher: editItem.teacher,
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
      {archiveItem && (
        <Confirmation
          id={archiveItem.id}
          title={archiveItem.name}
          btnLabel="Archive"
          variant="primary"
          msg="Are you really want to archive"
          handler={onArchive}
          pending={status.archive === "loading"}
          onHide={() => {
            setArchiveItem(null);
          }}
        >
          {error.archive && (
            <AlertDismissible
              className="mb-3"
              onHide={() => rdxDispatch(userErrorRemove("archive"))}
            >
              <ul className={`m-0`}>
                {error.archive.map((el, index) => (
                  <li key={index}>{el}</li>
                ))}
              </ul>
            </AlertDismissible>
          )}
        </Confirmation>
      )}
      <div className="table-responsive">
        <table className={`table ${styles.Table}`}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Class</th>
              <th scope="col">Subject Class</th>
              <th scope="col">Teacher</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={d.id}>
                <th scope="row">{index + 1}</th>
                <td
                  className={`text-uppercase ${
                    d.status === 1 ? "" : "text-primary"
                  }`}
                >
                  {d.name}
                </td>
                <td>{d.class_name}</td>
                <td>{d.subject_class}</td>
                <td>
                  {d.teacher.lname} ({d.teacher.userId})
                </td>
                <td>{new Date(d.created_at).toLocaleString()}</td>
                <td>{new Date(d.updated_at).toLocaleString()}</td>
                <td>
                  {d.status === 0 && (
                    <span className="text-danger fw-bolder text-uppercase">
                      archived
                    </span>
                  )}
                  {!d.archiveable && d.status === 1 && (
                    <IconButton
                      className={`fs-4`}
                      variant="warning"
                      onClick={() =>
                        setEditItem({
                          id: d.id,
                          name: d.name,
                          className: d.class_name,
                          teacher: d.teacher.id,
                        })
                      }
                    >
                      <FiEdit />
                    </IconButton>
                  )}
                  {d.archiveable && d.status === 1 && (
                    <IconButton
                      className={`fs-4`}
                      variant="primary"
                      onClick={() =>
                        setArchiveItem({
                          id: d.id,
                          name: d.name,
                        })
                      }
                    >
                      <BsFileEarmarkArrowDown />
                    </IconButton>
                  )}
                  {d.status === 1 && (
                    <IconButton
                      variant="danger"
                      className={`fs-4`}
                      onClick={() =>
                        setDeleteItem({
                          id: d.id,
                          name: d.name,
                        })
                      }
                    >
                      <FiTrash />
                    </IconButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Subjects = () => {
  return (
    <div>
      <AddSubject />
      <AllSubjects />
    </div>
  );
};

export default memo(Subjects);
