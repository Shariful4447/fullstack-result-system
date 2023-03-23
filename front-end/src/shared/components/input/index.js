import { classNameGenerator, getValidObjectValue } from "../../utils";

const Input = ({ id, label, errorText = null, classes, ...rest }) => {
  let container = getValidObjectValue("container", classes);
  let root = getValidObjectValue("root", classes);
  let error = getValidObjectValue("error", classes);

  return (
    <div className={`form-floating${classNameGenerator(container)}`}>
      <input
        type="text"
        className={`form-control${
          errorText ? " is-invalid" : ""
        }${classNameGenerator(root)} `}
        id={id}
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
      {errorText && (
        <div className={`invalid-feedback${classNameGenerator(error)}`}>
          {errorText}
        </div>
      )}
    </div>
  );
};

export default Input;
