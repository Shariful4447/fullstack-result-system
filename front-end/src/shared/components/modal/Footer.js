import styles from "./index.module.css";

const Footer = ({ className = "", children, ...rest }) => {
  return (
    <div className={`${styles.Footer} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Footer;
