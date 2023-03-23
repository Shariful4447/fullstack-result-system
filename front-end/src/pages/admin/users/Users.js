import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash } from "react-icons/fi";

import {
  deleteUser,
  fetchingUsers,
  userErrorRemove,
} from "../../../store/admin/users/actions";
import IconButton from "../../../shared/components/button/icon-button/IconButton";
import AddUser from "../components/add-user/AddUser";
import Confirmation from "../../../shared/components/confirmation";
import AlertDismissible from "../../../shared/components/alert/Dismissible";
import EditUser from "../components/edit-user/EditUser";
import styles from "./Users.module.css";

const AllUsers = () => {
  const rdxDispatch = useDispatch();
  const { status, data, error } = useSelector((state) => state.adminUsers);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const onHide = useCallback(() => {
    setEditItem(null);
  }, []);

  useEffect(() => {
    rdxDispatch(fetchingUsers());
  }, [rdxDispatch]);

  const onDelete = async () => {
    await rdxDispatch(
      deleteUser(deleteItem.id, () => {
        setDeleteItem(null);
      })
    );
  };

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
          No users <span className="fw-bolder">found</span>
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded border p-3`}>
      {editItem && (
        <EditUser
          data={{
            ...editItem,
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
              <th scope="col">User ID</th>
              <th scope="col">Forename</th>
              <th scope="col">Surname</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col">Created at</th>
              <th scope="col">Updated at</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={d.id}>
                <th scope="row">{index + 1}</th>
                <td>{d.userid}</td>
                <td>{d.fname}</td>
                <td>{d.lname}</td>
                <td>{d.user_name}</td>
                <td>{d.role}</td>
                <td>{new Date(d.created_at).toLocaleString()}</td>
                <td>{new Date(d.updated_at).toLocaleString()}</td>
                <td>
                  <IconButton
                    className={`ms-2 fs-4`}
                    variant="warning"
                    onClick={() =>
                      setEditItem({
                        id: d.id,
                        forename: d.fname,
                        surname: d.lname,
                        username: d.user_name,
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
                        name: `${d.fname} ${d.lname}`,
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

const Users = () => {
  return (
    <>
      <AddUser />
      <AllUsers />
    </>
  );
};

export default memo(Users);
