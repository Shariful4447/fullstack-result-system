const TableBox = ({ title, className, children }) => {
  return (
    <div className={`rounded border p-3 ${className ? className : ""}`}>
      <h4 className={`text-secondary mb-3 border-bottom pb-2`}>{title}</h4>
      {children}
    </div>
  );
};

export default TableBox;
