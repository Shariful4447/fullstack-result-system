import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  addUser,
  userErrorRemove,
} from "../../../../store/admin/users/actions";
import Button from "../../../../shared/components/button";
import AlertDismissible from "../../../../shared/components/alert/Dismissible";
import Input from "../../../../shared/components/input";
import Select from "../../../../shared/components/select";
import styles from "./AddUser.module.css";

const Schema = Yup.object().shape({
  forename: Yup.string().required("Forename is required!"),
  surname: Yup.string().required("Forename is required!"),
  role: Yup.string().required("Role is required"),
  username: Yup.string().required("Username is required!"),
  password: Yup.string().required("Password is required!"),
});

const AddUser = () => {
  const { error } = useSelector((state) => state.adminUsers);
  const rdxDispatch = useDispatch();
  const values = {
    forename: "",
    surname: "",
    role: "pupil",
    username: "",
    password: "",
  };

  const submitted = async (values, { resetForm }) => {
    await rdxDispatch(
      addUser(
        values.username,
        values.forename,
        values.surname,
        values.role,
        values.password
      )
    );
    resetForm({
      values: {
        forename: "",
        surname: "",
        role: "pupil",
        username: "",
        password: "",
      },
    });
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
              <div className={`col-12 col-sm-6`}>
                <Input
                  label="Forename"
                  id="forename"
                  name="forename"
                  type="text"
                  placeholder="forename"
                  value={values.forename}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorText={
                    touched.forename && errors.forename ? errors.forename : null
                  }
                />
              </div>
              <div className={`col-12 col-sm-6`}>
                <Input
                  label="Surname"
                  id="surname"
                  name="surname"
                  type="text"
                  placeholder="surname"
                  value={values.surname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorText={
                    touched.surname && errors.surname ? errors.surname : null
                  }
                />
              </div>
            </div>
            <Select
              label="Role"
              id="role"
              name="role"
              onBlur={handleBlur}
              onChange={handleChange}
              errorText={touched.role && errors.role ? errors.role : null}
              value={values.role}
              options={[
                { name: "Pupil", value: "pupil" },
                { name: "Teacher", value: "teacher" },
              ]}
              classes={{ container: "my-3" }}
            />
            <div className={`row g-3`}>
              <div className={`col-12 col-sm-6`}>
                <Input
                  label="Username"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorText={
                    touched.username && errors.username ? errors.username : null
                  }
                />
              </div>
              <div className={`col-12 col-sm-6`}>
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  errorText={
                    touched.password && errors.password ? errors.password : null
                  }
                />
              </div>
            </div>
            <Button
              className={`mt-3 fs-5 btn-warning btn-lg`}
              disabled={!(isValid && dirty)}
              type="submit"
              pending={isSubmitting}
            >
              Create
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default AddUser;
