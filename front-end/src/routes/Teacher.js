import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { TEACHER_ROUTES } from "./meta-data";
import { teacherAutoSignIn } from "../store/teacher/auth/actions";
import Header from "../pages/teacher/components/header";
import Home from "../pages/teacher/home";
import NotFound from "../pages/404";
import Pupil from "../pages/teacher/pupil";
import Auth from "../pages/teacher/auth/Auth";
import Test from "../pages/teacher/test";
import TestDetail from "../pages/teacher/test-detail";

const Teacher = () => {
  const { teacher, loading } = useSelector((state) => state.teacherAuth);
  const rdxDispatch = useDispatch();

  useEffect(() => {
    rdxDispatch(teacherAutoSignIn());
  }, [rdxDispatch]);

  if (loading === "idle") {
    return null;
  }

  return teacher.token && teacher.role === "teacher" ? (
  // return true ? (
    <>
      <Header />
      <main className={`container py-3`}>
        <Switch>
          <Route path={TEACHER_ROUTES.home.path} exact>
            <Home />
          </Route>
          <Route path={TEACHER_ROUTES.pupils.path} exact>
            <Pupil />
          </Route>
          <Route path={TEACHER_ROUTES.tests.path} exact>
            <Test />
          </Route>
          <Route path={TEACHER_ROUTES.testDetail.path} exact>
            <TestDetail />
          </Route>
          <Redirect
            from={TEACHER_ROUTES.auth.path}
            to={TEACHER_ROUTES.home.path}
          />
          <Route>
            <NotFound path={TEACHER_ROUTES.home.path} />
          </Route>
        </Switch>
      </main>
    </>
  ) : (
    <Switch>
      <Route path={TEACHER_ROUTES.auth.path} exact>
        <Auth />
      </Route>
      <Redirect to={TEACHER_ROUTES.auth.path} />
    </Switch>
  );
};

export default Teacher;
