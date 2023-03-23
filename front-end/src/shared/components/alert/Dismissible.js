const AlertDismissible = ({ onHide, className, children }) => {
  return (
    <div
      className={`alert alert-danger alert-dismissible fade show ${
        className ? className : ""
      }`}
      role="alert"
    >
      {children}
      <button
        onClick={onHide}
        type="button"
        className={`btn-close`}
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default AlertDismissible;
