import { memo, useState } from "react";

import CheckBox from "../../../../shared/components/checkbox";
import styles from "./Index.module.css";

const PupilSelect = ({ options, changeHandler }) => {
  const [singleOp, setSingleOp] = useState(options);
  const [allOp, setAllOp] = useState(false);

  const changed = (index, value) => {
    if (!value) {
      setAllOp(false);
    }
    setSingleOp((prev) => {
      const newState = [...prev];
      newState[index].value = value;
      return newState;
    });
    changeHandler(singleOp);
  };

  const allChanged = (value) => {
    setAllOp(value);
    setSingleOp((prev) => {
      const newState = prev.map((el) => {
        el.value = value;
        return el;
      });
      return newState;
    });
    changeHandler(singleOp);
  };

  console.log(singleOp);
  return (
    <div className="round-1 border p-3">
      <CheckBox
        id="allOp"
        name="allOp"
        label="Select All"
        onChange={(e) => allChanged(e.target.checked ? true : false)}
        checked={allOp}
      />

      <div className={`row g-2 ${styles.PupilSelect}`}>
        {singleOp.map((el, index) => (
          <div key={index} className="col-6 col-sm-4">
            <CheckBox
              id={el.id}
              name={el.id}
              label={el.name}
              onChange={(e) => changed(index, e.target.checked ? true : false)}
              checked={el.value}
              status={!!el.status}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(
  PupilSelect,
  (prevProps, nextProps) => prevProps.options === nextProps.options
);
