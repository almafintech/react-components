/* eslint-disable unicorn/no-new-array */
import React, { useEffect, useRef, useState } from "react";
import styles from "./InputToken.module.scss";

interface InputTokenProps {
  token?: string | null;
  setToken: (token: string) => void;
  charactersAmount: number;
  handleOnBlur?: () => void;
  disabled?: boolean;
}

const InputToken = ({
  token,
  setToken,
  charactersAmount,
  handleOnBlur,
  disabled,
}: InputTokenProps) => {
  const [inputValues, setInputValues] = useState(
    new Array(charactersAmount).fill("")
  );
  const [focusedInputIndex, setFocusedInputIndex] = useState(0);
  const inputRefs = useRef<HTMLInputElement[] | null[]>([]);
  const tokenArray = token?.toUpperCase().split("").slice(0, charactersAmount);

  // fill input values with token
  useEffect(() => {
    if (token && tokenArray) {
      // fill input values with token and if its shorter than charactersAmount, fill the rest with empty strings
      if (tokenArray.length < charactersAmount) {
        const newInputValues = inputValues.map((_, index) => {
          return index < tokenArray.length ? tokenArray[index] : "";
        });
        setInputValues(newInputValues);
      } else {
        setInputValues(tokenArray);
      }
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const nextInput = inputRefs.current[focusedInputIndex + 1];
    const newInputValues = [...inputValues];
    newInputValues[focusedInputIndex] = value.toUpperCase().trim();

    if (inputValues[focusedInputIndex] === "" && value.length === 1) {
      setInputValues(newInputValues);
      nextInput?.focus();
    } else if (inputValues[focusedInputIndex] !== "" && value.trim() === "") {
      setInputValues(newInputValues);
    } else if (value.trim() !== "") return;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const prevInput = inputRefs.current[focusedInputIndex - 1];
    const nextInput = inputRefs.current[focusedInputIndex + 1];
    const newInputValues = [...inputValues];

    if (e.key === "Backspace") {
      newInputValues[focusedInputIndex] = "";
      !inputValues[focusedInputIndex]
        ? prevInput?.focus()
        : setInputValues(newInputValues);
    }
    e.key === "ArrowLeft" && prevInput?.focus();
    e.key === "ArrowRight" && nextInput?.focus();
  };

  const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text/plain").toUpperCase().trim();
    const croppedText = text.slice(0, charactersAmount - focusedInputIndex);
    const charactersArray = croppedText.split("");

    const newInputValues = [...inputValues];
    for (const [index, character] of charactersArray.entries()) {
      newInputValues[focusedInputIndex + index] = character;
    }
    setInputValues(newInputValues);
    // focus on last edited input after paste
    inputRefs.current[focusedInputIndex + charactersArray.length - 1]?.focus();
  };

  const handleBlur = () => {
    setFocusedInputIndex(-1);
  };

  useEffect(() => {
    const token = inputValues.join("");
    if (focusedInputIndex === -1 && token.length !== charactersAmount) {
      handleOnBlur?.();
    }
  }, [focusedInputIndex]);

  useEffect(() => {
    const newValue = inputValues.join("");
    setToken(newValue);
  }, [inputValues]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    if (tokenArray) {
      inputRefs.current[tokenArray.length - 1]?.focus();
    }
  }, []);

  return (
    <div className={styles.container}>
      {Array.from({ length: charactersAmount })
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            type="text"
            className={`${styles.inputBox}`}
            onBlur={handleBlur}
            onFocus={() => setFocusedInputIndex(index)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={inputValues[index]}
            ref={(ref) => (inputRefs.current[index] = ref)}
            onPaste={handleOnPaste}
            disabled={disabled}
          />
        ))}
    </div>
  );
};

export default InputToken;
