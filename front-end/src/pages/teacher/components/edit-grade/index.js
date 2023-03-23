import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  editPupilTestGrade,
  testPupilGradeErrorRemove,
} from "../../../../store/teacher/test-pupil-grade/actions";
import AlertDismissible from "../../../../shared/components/alert/Dismissible";
import Button from "../../../../shared/components/button";
import Input from "../../../../shared/components/input";
import Modal from "../../../../shared/components/modal";
// import styles from "./AddUser.module.css";

const Schema = Yup.object().shape({
  grade: Yup.number().required("Grade is required!"),
});

const EditGrade = ({ data: { id, name, grade }, onHide }) => {
  const rdxDispatch = useDispatch();
  const { error } = useSelector((state) => state.teacherPupilTestGrade);
  const values = {
    grade: grade || "",
  };

  const submitted = async (values) => {
    await rdxDispatch(
      editPupilTestGrade(id, values.grade, () => {
        onHide();
      })
    );
  };

  return (
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
          <Modal
            id="modal"
            onHide={onHide}
            show={!!id}
            center
            scroll
            staticBack
          >
            <Modal.Header label={name} closeBtn />
            <form onSubmit={handleSubmit} autoComplete="off">
              <Modal.Body>
                {error.edit && (
                  <AlertDismissible
                    className="mb-3"
                    onHide={() =>
                      rdxDispatch(testPupilGradeErrorRemove("edit"))
                    }
                  >
                    <ul className={`m-0`}>
                      {error.edit.map((el, index) => (
                        <li key={index}>{el}</li>
                      ))}
                    </ul>
                  </AlertDismissible>
                )}
                <Input
                  label="Grade"
                  id="grade"
                  name="grade"
                  type="number"
                  placeholder="grade"
                  value={values.grade}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorText={
                    touched.grade && errors.grade ? errors.grade : null
                  }
                />
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
          </Modal>
        );
      }}
    </Formik>
  );
};

export default EditGrade;
