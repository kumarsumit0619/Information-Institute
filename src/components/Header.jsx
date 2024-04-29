import classes from "./Header.module.css";
import { useState } from "react";

export default function Header({ updateShowForm }) {
  const [activeNavBtn, setActiveNavBtn] = useState("view");

  function navClickHandler(flag, action) {
    updateShowForm(flag);
    setActiveNavBtn(action);
  }
  return (
    <>
      <header className={classes["main-header"]}>Information Institute</header>
      <nav className={classes["nav-bar"]}>
        <ul>
          <li
            onClick={() => navClickHandler(true, "add")}
            className={activeNavBtn === "add" ? classes["active"] : ""}
          >
            Add New Student
          </li>
          <li
            onClick={() => navClickHandler(false, "view")}
            className={activeNavBtn === "view" ? classes["active"] : ""}
          >
            View Existing Students
          </li>
        </ul>
      </nav>
    </>
  );
}
