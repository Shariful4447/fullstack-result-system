import { BsGrid1X2Fill } from "react-icons/bs";
import { FiUsers, FiBook } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

import { ADMIN_ROUTES } from "../../../../../routes/meta-data";
import Backdrop from "../../../../../shared/components/backdrop/Backdrop";
import NavItem from "./NavItem";
import styles from "./Sidebar.module.css";

const Sidebar = ({ open, onClose }) => {
  return (
    open && (
      <>
        <Backdrop className={`${styles.Back}`} open={open} clicked={onClose} />
        <aside className={`${styles.Root}`}>
          <menu className={`${styles.Menu}`}>
            <h1 className={`m-0 ${styles.Title}`}>Admin</h1>
            <nav>
              <ul className={`m-0 p-0 ${styles.NavItems}`}>
                <NavItem
                  icon={<BsGrid1X2Fill />}
                  to={ADMIN_ROUTES.dashboard.path}
                  onClose={onClose}
                  exact
                >
                  {ADMIN_ROUTES.dashboard.name}
                </NavItem>
                <NavItem
                  icon={<FiUsers />}
                  to={ADMIN_ROUTES.users.path}
                  onClose={onClose}
                  exact
                >
                  {ADMIN_ROUTES.users.name}
                </NavItem>
                <NavItem
                  icon={<FaUsers />}
                  to={ADMIN_ROUTES.classes.path}
                  onClose={onClose}
                  exact
                >
                  {ADMIN_ROUTES.classes.name}
                </NavItem>
                <NavItem
                  icon={<FiBook />}
                  to={ADMIN_ROUTES.subjects.path}
                  onClose={onClose}
                  exact
                >
                  {ADMIN_ROUTES.subjects.name}
                </NavItem>
                {/* <li>
                  <SubItems
                    name="Users"
                    icon={<FiUser />}
                    data={[
                      { ...ADMIN_ROUTES.users },
                    ]}
                  />
                </li> */}
              </ul>
            </nav>
          </menu>
        </aside>
      </>
    )
  );
};

export default Sidebar;
