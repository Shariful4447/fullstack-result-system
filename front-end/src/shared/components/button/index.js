import { classNameGenerator } from "../../utils";
import styles from "./Index.module.css";

const Button = ({
  children,
  pending = false,
  disabled = false,
  className,
  pendingClassName,
  ...rest
}) => {
  if (pending) {
    disabled = true;
  }

  return (
    <button
      {...rest}
      disabled={disabled}
      className={`btn ${styles.Root}${classNameGenerator(
        className
      )}`}
    >
      {pending && <span className={`${styles.PendingBlock}${classNameGenerator(pendingClassName)}`} />}
      {children}
    </button>
  );
};
export default Button;
