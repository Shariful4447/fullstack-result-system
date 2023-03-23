import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import { fetchingPupilOptions } from "../../../../store/teacher/utility/pupil-options/actions";
import {
  addPupilTestGrade,
  testPupilGradeErrorRemove,
} from "../../../../store/teacher/test-pupil-grade/actions";
import AlertDismissible from "../../../../shared/components/alert/Dismissible";
import Button from "../../../../shared/components/button";
import Input from "../../../../shared/components/input";
import Select from "../../../../shared/components/select";
import styles from "./Index.module.css";

const Schema = Yup.object().shape({
  pupil: Yup.string().required("Pupil is required!"),
  grade: Yup.number().required("Grade is required!"),
});

const AddGrade = ({ subjectId, testId }) => {
  const rdxDispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.teacherPupilOptions
  );
  const teacherPupilTestGrade = useSelector(
    (state) => state.teacherPupilTestGrade
  );

  useEffect(() => {
    rdxDispatch(fetchingPupilOptions(subjectId));
  }, [rdxDispatch, subjectId]);

  if (status === "idle") {
    return null;
  }

  if (status === "loading") {
    return (
      <div
        className={`${styles.Form} rounded-1 border mb-3 p-3 d-flex justify-content-center`}
      >
        <div className="spinner-grow text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "complete" && error) {
    return (
      <div className={`${styles.Form} mb-3 alert alert-danger`} role="alert">
        <ul className={`m-0`}>
          {error.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (status === "complete" && !data.length) {
    return (
      <div className={`${styles.Form} rounded-1 border mb-3 p-3`}>
        <p className="text-danger m-0">
          <span className="fw-bolder">Pupils</span> may be not added. So, can't
          be added grade.
        </p>
      </div>
    );
  }

  const values = {
    pupil: data[0]["value"],
    grade: "",
  };

  const submitted = async (values, { resetForm }) => {
    await rdxDispatch(
      addPupilTestGrade(
        subjectId,
        testId,
        values.pupil,
        values.grade
      )
    );
    resetForm();
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
          <form
            className={`${styles.Form} rounded-1 border mb-3 p-3`}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            {teacherPupilTestGrade.error.add && (
              <AlertDismissible
                className="mb-3"
                onHide={() => rdxDispatch(testPupilGradeErrorRemove("add"))}
              >
                <ul className={`m-0`}>
                  {teacherPupilTestGrade.error.add.map((el, index) => (
                    <li key={index}>{el}</li>
                  ))}
                </ul>
              </AlertDismissible>
            )}
            <div className={`row g-3`}>
              <div className="col-12 col-sm-6">
                <Select
                  label="Pupil"
                  id="pupil"
                  name="pupil"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorText={
                    touched.pupil && errors.pupil ? errors.pupil : null
                  }
                  value={values.pupil}
                  options={data}
                />
              </div>
              <div className="col-12 col-sm-6">
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
              </div>
            </div>
            <Button
              className={`mt-3 fs-5 btn-warning`}
              disabled={!(isValid && dirty)}
              type="submit"
              pending={isSubmitting}
            >
              Add
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default AddGrade;
