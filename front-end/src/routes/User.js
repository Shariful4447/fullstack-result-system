import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { pupilAutoSignIn } from "../store/pupil/auth/actions";
import { USER_ROUTES } from "./meta-data";
import SubjectTestGrade from "../pages/user/subject-test-grade";
import Home from "../pages/user/home";
import Auth from "../pages/user/auth";
import NotFound from "../pages/404";
import Header from "../pages/user/components/header";

const User = () => {
  const { pupil, loading } = useSelector((state) => state.pupilAuth);
  const rdxDispatch = useDispatch();

  useEffect(() => {
    rdxDispatch(pupilAutoSignIn());
  }, [rdxDispatch]);

  if (loading === "idle") {
    return null;
  }

  return pupil.token && pupil.role === "pupil" ? (
  // return true ? (
    <>
      <Header />
      <main className={`container py-3`}>
        <Switch>
          <Route path={USER_ROUTES.home.path} exact>
            <Home />
          </Route>
          <Redirect
            from={USER_ROUTES.auth.path}
            to={USER_ROUTES.home.path}
            exact
          />
          <Route path={USER_ROUTES.tests.path} exact>
            <SubjectTestGrade />
          </Route>
          <Route>
            <NotFound path={USER_ROUTES.home.path} />
          </Route>
        </Switch>
      </main>
    </>
  ) : (
    <Switch>
      <Route path={USER_ROUTES.auth.path} exact>
        <Auth />
      </Route>
      <Redirect to={USER_ROUTES.auth.path} />
    </Switch>
  );
};

export default User;
