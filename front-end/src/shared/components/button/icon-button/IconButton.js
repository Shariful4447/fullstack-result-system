import { classNameGenerator } from "../../../utils";
import styles from "./IconButton.module.css";

const IconButton = ({
  children,
  pending = false,
  disabled = false,
  spinnerWeight,
  variant,
  className,
  ...rest
}) => {
  if (pending) {
    disabled = true;
  }

  let variantClassName = "";
  switch (variant) {
    case "primary":
      variantClassName = styles.Primary;
      break;
    case "secondary":
      variantClassName = styles.Secondary;
      break;
    case "success":
      variantClassName = styles.Success;
      break;

    case "info":
      variantClassName = styles.Info;
      break;
    case "danger":
      variantClassName = styles.Danger;
      break;
    case "warning":
      variantClassName = styles.Warning;
      break;
    case "light":
      variantClassName = styles.Light;
      break;
    case "dark":
      variantClassName = styles.Dark;
      break;

    default:
      variantClassName = "";
      break;
  }

  return (
    <button
      {...rest}
      disabled={disabled}
      className={`${styles.Root}${classNameGenerator(
        className
      )}${classNameGenerator(variantClassName)}`}
    >
      {pending && (
        <span
          className={`${styles.PendingBlock}`}
          style={
            spinnerWeight
              ? { width: `${spinnerWeight}em`, height: `${spinnerWeight}em` }
              : undefined
          }
        />
      )}
      {children}
    </button>
  );
};
export default IconButton;
