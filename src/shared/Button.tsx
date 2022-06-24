import classes from "./Button.module.scss";
export default function Button({ children, disabled=false, onclick }:{children:any,disabled?:boolean ,onclick}) {
  return (
    <button
      disabled={disabled && true}
      className={classes.Button}
      onClick={onclick}>
      {children}
    </button>
  );
}
