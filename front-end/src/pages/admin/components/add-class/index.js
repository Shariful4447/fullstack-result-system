import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  addClass,
  userErrorRemove,
} from "../../../../store/admin/classes/actions";
import Button from "../../../../shared/components/button";
import AlertDismissible from "../../../../shared/components/alert/Dismissible";
import Input from "../../../../shared/components/input";
import styles from "./Index.module.css";

const Schema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
});

const AddClass = () => {
  const { error } = useSelector((state) => state.adminClasses);
  const rdxDispatch = useDispatch();
  const values = {
    name: "",
  };

  const submitted = async (values, { resetForm }) => {
    await rdxDispatch(addClass(values.name));
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
            <div className={`m-0 row g-3 align-items-sm-stretch`}>
              <div className="col-12 col-sm-auto flex-sm-grow-1 p-0 pe-sm-3 m-sm-0">
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
              <Button
                style={{ maxHeight: "calc(3.5rem + 2px)" }}
                className={`col-12 col-sm-auto m-sm-0 fs-5 btn-warning`}
                disabled={!(isValid && dirty)}
                type="submit"
                pending={isSubmitting}
              >
                Create
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default AddClass;
