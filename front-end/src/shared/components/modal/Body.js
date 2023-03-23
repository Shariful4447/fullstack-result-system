import styles from "./index.module.css";

const Body = ({ className = "", children, ...rest }) => {
  return (
    <div className={`${styles.Body} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Body;
