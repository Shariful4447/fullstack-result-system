import Button from "../button";
import Modal from "../modal";
import styles from "./Index.module.css";

const Confirmation = ({
  id,
  title,
  btnLabel = "Delete",
  pending = false,
  onHide,
  handler,
  variant = "danger",
  msg = "Are you really want to delete",
  children,
}) => {
  return (
    <Modal id="modal" show={!!id} onHide={onHide} center scroll staticBack>
      <Modal.Body>
        {children}
        {msg} <span className={`fw-bolder text-${variant}`}>{title}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={`btn-outline-secondary`}
          type="button"
          onClick={onHide}
        >
          Cancel
        </Button>
        <Button
          pendingClassName={styles.Pending}
          className={`ms-3 btn-${variant}`}
          type="button"
          pending={pending}
          onClick={handler}
        >
          {btnLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirmation;
