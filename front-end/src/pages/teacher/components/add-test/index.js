import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { useParams } from "react-router-dom";

import { getValidObjectValue } from "../../../../shared/utils";
import {
  addTest,
  userErrorRemove,
} from "../../../../store/teacher/tests/actions";
import AlertDismissible from "../../../../shared/components/alert/Dismissible";
import Button from "../../../../shared/components/button";
import Input from "../../../../shared/components/input";
import styles from "./Index.module.css";

const Schema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  date: Yup.date()
    .required("Date is required!")
    .max(
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      "Maximum date can be one day later"
    ),
});

const AddTest = () => {
  const { error } = useSelector((state) => state.teacherTests);
  const rdxDispatch = useDispatch();
  const params = useParams();

  const subjectId = getValidObjectValue("subjectId", params);
  const values = {
    name: "",
    date: "",
  };

  const submitted = async (values, { resetForm }) => {
    if (subjectId) {
      await rdxDispatch(addTest(subjectId, { ...values }));
      resetForm();
    }
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
            {error.add && (
              <AlertDismissible
                className="mb-3"
                onHide={() => rdxDispatch(userErrorRemove("add"))}
              >
                <ul className={`m-0`}>
                  {error.add.map((el, index) => (
                    <li key={index}>{el}</li>
                  ))}
                </ul>
              </AlertDismissible>
            )}
            <div className={`row g-3`}>
              <div className="col-12 col-sm-6">
                <Input
                  label="Name"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorText={touched.name && errors.name ? errors.name : null}
                />
              </div>
              <div className="col-12 col-sm-6">
                <Input
                  label="Date"
                  id="date"
                  name="date"
                  type="date"
                  placeholder="date"
                  value={values.date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorText={touched.date && errors.date ? errors.date : null}
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

export default AddTest;
