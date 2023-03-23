import { classNameGenerator, getValidObjectValue } from "../../utils";

const Select = ({
  id,
  label,
  errorText = null,
  options,
  classes,
  ...rest
}) => {
  let container = getValidObjectValue("container", classes);
  let root = getValidObjectValue("root", classes);
  let error = getValidObjectValue("error", classes);

  return (
    <div className={`form-floating${classNameGenerator(container)}`}>
      <select
        className={`form-select${
          errorText ? " is-invalid" : ""
        }${classNameGenerator(root)}`}
        id={id}
        {...rest}
      >
        {options.map((el, index) => (
          <option
            key={index}
            value={el.value}
          >
            {el.name}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
      {errorText && (
        <div className={`invalid-feedback${classNameGenerator(error)}`}>
          {errorText}
        </div>
      )}
    </div>
  );
};

export default Select;
