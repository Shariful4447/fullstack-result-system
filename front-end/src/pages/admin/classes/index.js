import { Fragment, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash } from "react-icons/fi";

import {
  deleteClass,
  fetchingClasses,
  userErrorRemove,
} from "../../../store/admin/classes/actions";
import IconButton from "../../../shared/components/button/icon-button/IconButton";
import Confirmation from "../../../shared/components/confirmation";
import AlertDismissible from "../../../shared/components/alert/Dismissible";
import AddClass from "../components/add-class";
import EditClass from "../components/edit-class";
import styles from "./Index.module.css";

const AllClasses = () => {
  const rdxDispatch = useDispatch();
  const { status, data, error } = useSelector((state) => state.adminClasses);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const onHide = () => {
    setEditItem(null);
  };

  const onDelete = async () => {
    await rdxDispatch(
      deleteClass(deleteItem.id, () => {
        setDeleteItem(null);
      })
    );
  };

  useEffect(() => {
    rdxDispatch(fetchingClasses());
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
          No classes <span className="fw-bolder">found</span>
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded border p-3`}>
      {editItem && (
        <EditClass
          data={{
            id: editItem.id,
            name: editItem.name,
            pupils: [...editItem.pupils],
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
      <div className="table-responsive">
        <table className={`table ${styles.Table}`}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Pupils</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={d.id}>
                <th scope="row">{index + 1}</th>
                <td>{d.name}</td>
                <td>
                  {Array.isArray(d.assign_class) && d.assign_class.length
                    ? d.assign_class.map(
                        (el, index) =>
                          el.pupil && (
                            <Fragment key={index}>
                              <span>
                                {el.pupil.lname} - ({el.pupil.userid})
                              </span>

                              <br />
                            </Fragment>
                          )
                      )
                    : "No pupil assigned"}
                </td>
                <td>{new Date(d.created_at).toLocaleString()}</td>
                <td>{new Date(d.updated_at).toLocaleString()}</td>
                <td>
                  <IconButton
                    className={`ms-2 fs-4`}
                    variant="warning"
                    onClick={() =>
                      setEditItem({
                        id: d.id,
                        name: d.name,
                        pupils: d.assign_class.filter((p) => p.pupil),
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
                        name: `${d.name}`,
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

const Classes = () => {
  return (
    <>
      <AddClass />
      <AllClasses />
    </>
  );
};

export default memo(Classes);
