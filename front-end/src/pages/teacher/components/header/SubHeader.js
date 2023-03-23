const SubHeader = ({ children }) => {
  return (
    <h1 className={`border fs-3 px-3 py-2 mb-3 fw-bolder text-secondary`}>
      {children}
    </h1>
  );
};

export default SubHeader;