import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { BiShare } from "react-icons/bi";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  adminAuthErrorRemove,
  adminSignIn,
} from "../../../store/admin/auth/actions";
import AlertDismissible from "../../../shared/components/alert/Dismissible";
import Button from "../../../shared/components/button";
import styles from "./Auth.module.css";

const Schema = Yup.object().shape({
  username: Yup.string().required("User ID is required!"),
  password: Yup.string().required("Password is required!"),
});

const Auth = () => {
  const rdxDispatch = useDispatch();
  const { error } = useSelector((state) => state.adminAuth);
  const { push } = useHistory();
  const values = {
    username: "",
    password: "",
  };

  const submitted = async (values) => {
    await rdxDispatch(adminSignIn(values.username, values.password, push));
  };

  return (
    <div className={`${styles.Root} px-3`}>
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
              className={`${styles.Form}`}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div className={`card`}>
                <div
                  className={`card-header bg-dark text-light fw-bold ${styles.Title}`}
                >
                  <Link to="/" className={`${styles.Back}`}>
                    <BiShare />
                  </Link>
                  Admin Authentication
                </div>
                <div className={`card-body`}>
                  {error && (
                    <AlertDismissible
                      className="mb-3"
                      onHide={() => rdxDispatch(adminAuthErrorRemove())}
                    >
                      <ul className={`m-0`}>
                        {error.map((el, index) => (
                          <li key={index}>{el}</li>
                        ))}
                      </ul>
                    </AlertDismissible>
                  )}
                  <div className={`form-floating mb-3`}>
                    <input
                      type="text"
                      className={`form-control ${
                        touched.username && errors.username ? "is-invalid" : ""
                      }`}
                      id="username"
                      name="username"
                      placeholder="username"
                      value={values.username}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <label htmlFor="username">User ID</label>
                    {touched.username && errors.username && (
                      <div className={`invalid-feedback`}>
                        {errors.username}
                      </div>
                    )}
                  </div>
                  <div className={`form-floating`}>
                    <input
                      type="password"
                      className={`form-control ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      name="password"
                      placeholder="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    {touched.password && errors.password && (
                      <div className={`invalid-feedback`}>
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>
                <div className={`card-footer d-flex justify-content-end`}>
                  <Button
                    className={`fs-5 btn-warning btn-lg`}
                    disabled={!(isValid && dirty)}
                    type="submit"
                    pending={isSubmitting}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Auth;
