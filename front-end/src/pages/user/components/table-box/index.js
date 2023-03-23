const TableBox = ({ title, children }) => {
  return (
    <div className={`rounded border p-3`}>
      <h4 className={`text-secondary mb-3 border-bottom pb-2`}>{title}</h4>
      {children}
    </div>
  );
};

export default TableBox;
