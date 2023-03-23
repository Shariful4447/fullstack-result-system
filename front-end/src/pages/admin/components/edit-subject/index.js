import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";

import { editSubject, userErrorRemove } from "../../../../store/admin/subjects/actions";
import AlertDismissible from "../../../../shared/components/alert/Dismissible";
import Button from "../../../../shared/components/button";
import Input from "../../../../shared/components/input";
import Modal from "../../../../shared/components/modal";
import Select from "../../../../shared/components/select";
// import styles from "./AddUser.module.css";

const Schema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  className: Yup.string().required("Class is required!"),
  teacher: Yup.string().required("Teacher is required"),
});

const EditSubject = ({ data: { id, name, className, teacher }, onHide }) => {
  const rdxDispatch = useDispatch();
  const { status, classes, teachers } = useSelector(
    (state) => state.adminUtilitySubjectOptions
  );
  const { error } = useSelector((state) => state.adminSubjects);

  const values = {
    name: name || "",
    className: className || "",
    teacher: teacher || "",
  };

  const submitted = async (values) => {
    await rdxDispatch(
      editSubject(
        id,
        values.name,
        values.className,
        values.teacher,
        () => {
          onHide();
        }
      )
    );
  };

  if (status === "idle") {
    return null;
  }

  if (!classes.length || !teachers.length) {
    return (
      <Modal id="modal" onHide={onHide} show={!!id} center scroll>
        <Modal.Body className="text-danger">
          <span className="fw-bolder">Classes</span> or{" "}
          <span className="fw-bolder">Teachers</span> may be not added.
        </Modal.Body>
        <Modal.Footer>
          <Button className={`fs-5 btn-warning`} onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal id="modal" onHide={onHide} show={!!id} center scroll staticBack>
      <Modal.Header label={name} closeBtn />
      <Formik
        initialValues={values}
        onSubmit={submitted}
        validationSchema={Schema}
      >
        {({
          touched,
          isSubmitting,
          errors,
          values,
          isValid,
          dirty,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => {
          return (
            <form onSubmit={handleSubmit} autoComplete="off">
              <Modal.Body>
                {error.edit && (
                  <AlertDismissible
                    className="mb-3"
                    onHide={() => rdxDispatch(userErrorRemove("edit"))}
                  >
                    <ul className={`m-0`}>
                      {error.edit.map((el, index) => (
                        <li key={index}>{el}</li>
                      ))}
                    </ul>
                  </AlertDismissible>
                )}
                <Input
                  label="Name"
                  id="edit-name"
                  name="name"
                  type="text"
                  placeholder="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorText={touched.name && errors.name ? errors.name : null}
                  classes={{ container: "mb-3" }}
                />
                <div className={`row g-3`}>
                  <div className={`col-12 col-sm-6`}>
                    <Select
                      label="Class"
                      id="edit-className"
                      name="className"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      errorText={
                        touched.className && errors.className
                          ? errors.className
                          : null
                      }
                      value={values.className}
                      options={classes}
                    />
                  </div>
                  <div className={`col-12 col-sm-6`}>
                    <Select
                      label="Teacher"
                      id="edit-teacher"
                      name="teacher"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      errorText={
                        touched.teacher && errors.teacher
                          ? errors.teacher
                          : null
                      }
                      value={values.teacher}
                      options={teachers}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className={`fs-5 btn-warning`}
                  disabled={!(isValid && dirty)}
                  type="submit"
                  pending={isSubmitting}
                >
                  Edit
                </Button>
              </Modal.Footer>
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default EditSubject;
