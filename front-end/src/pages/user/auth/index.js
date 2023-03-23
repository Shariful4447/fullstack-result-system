import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { BiShare } from "react-icons/bi";
import * as Yup from "yup";
import { Formik } from "formik";

import { pupilAuthErrorRemove, pupilSignIn } from "../../../store/pupil/auth/actions";
import AlertDismissible from "../../../shared/components/alert/Dismissible";
import Button from "../../../shared/components/button";
import Input from "../../../shared/components/input";
import styles from "./Auth.module.css";

const Schema = Yup.object().shape({
  username: Yup.string().required("User ID is required!"),
  password: Yup.string().required("Password is required!"),
});

const Auth = () => {
  const rdxDispatch = useDispatch();
  const { error } = useSelector((state) => state.pupilAuth);
  const { push } = useHistory();
  const values = {
    username: "",
    password: "",
  };

  const submitted = async (values) => {
    await rdxDispatch(pupilSignIn(values.username, values.password, push));
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
                  Sign In (Pupil)
                </div>
                <div className={`card-body`}>
                  {error && (
                    <AlertDismissible
                      className="mb-3"
                      onHide={() =>
                        rdxDispatch(pupilAuthErrorRemove())
                      }
                    >
                      <ul className={`m-0`}>
                        {error.map((el, index) => (
                          <li key={index}>{el}</li>
                        ))}
                      </ul>
                    </AlertDismissible>
                  )}
                  <Input
                    label="User ID"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="User ID"
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errorText={
                      touched.username && errors.username
                        ? errors.username
                        : null
                    }
                    classes={{ container: "mb-3" }}
                  />
                  <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    errorText={
                      touched.password && errors.password
                        ? errors.password
                        : null
                    }
                  />
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
