import ReactDOM from "react-dom";
import classes from "./notification.module.scss";

export default function Notification() {
  return ReactDOM.createPortal(
    <div className={classes.notification}>{<h2>Plese log in first</h2>}</div>,
    document.getElementById("notification")
  );
}
