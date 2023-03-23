import { classNameGenerator, getValidObjectValue } from "../../utils";
import styles from "./Index.module.css";

const CheckBox = ({
  id,
  label,
  status = false,
  type = "checkbox",
  classes,
  ...rest
}) => {
  let container = getValidObjectValue("container", classes);
  let root = getValidObjectValue("root", classes);
  let text = getValidObjectValue("label", classes);

  return (
    <div className={`form-check${classNameGenerator(container)}`}>
      <input
        className={`form-check-input${classNameGenerator(root)}`}
        type={type}
        id={id}
        {...rest}
      />
      <label
        className={`form-check-label pe-3${classNameGenerator(text)} ${
          status ? styles.Status : ""
        }`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
