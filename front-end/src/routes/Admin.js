import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import { ADMIN_ROUTES } from "./meta-data";
import { adminAutoSignIn } from "../store/admin/auth/actions";
import Header from "../pages/admin/components/navigations/header/Header";
import Sidebar from "../pages/admin/components/navigations/sidebar/Sidebar";
import Auth from "../pages/admin/auth/Auth";
import Dashboard from "../pages/admin/dashboard";
import Users from "../pages/admin/users/Users";
import Classes from "../pages/admin/classes";
import NotFound from "../pages/404";
import styles from "./Admin.module.css";
import Subjects from "../pages/admin/subjects";

const Admin = () => {
  const { admin, loading } = useSelector((state) => state.adminAuth);
  const rdxDispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  useLayoutEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    rdxDispatch(adminAutoSignIn());
  }, [rdxDispatch]);

  if (loading === "idle") {
    return null;
  }

  return admin.token && admin.role === "admin" ? (
    <div className={`${styles.Root}`}>
      <Sidebar open={isSidebarOpen} onClose={closeSidebar} />
      <section className={`${styles.Content}`}>
        <Header onToggle={toggleSidebar} />
        <main className={`p-3`}>
          <Switch>
            <Route path={ADMIN_ROUTES.dashboard.path} exact>
              <Dashboard />
            </Route>
            <Route path={ADMIN_ROUTES.users.path} exact>
              <Users />
            </Route>
            <Route path={ADMIN_ROUTES.classes.path} exact>
              <Classes />
            </Route>
            <Route path={ADMIN_ROUTES.subjects.path} exact>
              <Subjects />
            </Route>
            <Redirect
              from={ADMIN_ROUTES.auth.path}
              to={ADMIN_ROUTES.dashboard.path}
            />
            <Route>
              <NotFound path={ADMIN_ROUTES.dashboard.path} />
            </Route>
          </Switch>
        </main>
      </section>
    </div>
  ) : (
    <Switch>
      <Route path={ADMIN_ROUTES.auth.path} exact>
        <Auth />
      </Route>
      <Redirect to={ADMIN_ROUTES.auth.path} />
    </Switch>
  );
};

export default Admin;
