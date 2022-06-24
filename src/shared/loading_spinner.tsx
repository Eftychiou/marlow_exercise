import ReactDOM from "react-dom";

import classes from "./loading_spinner.module.scss";

export default function Spinner() {
  return ReactDOM.createPortal(
    <div className={classes.Spinner}>
      <div className={classes.Loader} />
    </div>,
    document.getElementById("notification")
  );
}
