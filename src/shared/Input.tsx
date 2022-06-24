import classes from "./Input.module.scss";
export default function Input({ value, label }) {
  return (
    <div className={classes.Input}>
      <div className={classes.form__group}>
        <input
          className={classes.form__field}
          placeholder='Email'
          name={value}
          id={value}
          required
        />
        <label htmlFor={value} className={classes.form__label}>
          {label}
        </label>
      </div>
    </div>
  );
}
