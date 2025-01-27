import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of cities : </p>
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>Copyright</p>
      </footer>
    </div>
  );
}

export default Sidebar;
