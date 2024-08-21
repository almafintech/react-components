import { InputCopyProps } from "./types";
import CopyIcon from "../../assets/images/ui/icons/ui-icon-copy.svg";

import styles from "./InputCopy.module.scss";

const InputFile = ({ value, className, onClick }: InputCopyProps) => {
  const { container, inputStyle } = styles;

  return (
    <div className={`${container} ${className}`}>
      <input className={inputStyle} value={value} disabled />
      <button onClick={onClick}>
        <img src={CopyIcon}></img>
      </button>
    </div>
  );
};

export default InputFile;
