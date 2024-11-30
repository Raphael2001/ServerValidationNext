import React, {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  forwardRef,
} from "react";

import styles from "./BasicInput.module.scss";
import { OnKeyDownInput } from "utils/types/inputs";
import { InputAccessibility } from "utils/types/form";

type Props = {
  value: string | number;
  onChange: ChangeEventHandler;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;

  onFocus?: () => void;
  onBlur?: () => void;
  type?: HTMLInputTypeAttribute;
  className?: string;
  onKeyDown?: (e: OnKeyDownInput) => void;
};

const BasicInput = forwardRef<HTMLInputElement, Props & InputAccessibility>(
  (props, ref) => {
    const {
      value,
      onChange,
      id = "",
      name = "",
      placeholder = "",
      type = "",
      disabled = false,
      onFocus = () => {},
      onBlur = () => {},
      className = "",
      onKeyDown = () => {},
      ariaRequired = false,
      ariaInvalid = false,
      ariaLabel = "",
      ariaLabelledBy = "",
    } = props;

    const exceptThisSymbols = ["e", "E", "+", "-", "."];

    function onKeyDownHandler(e: OnKeyDownInput) {
      if (type === "number" && exceptThisSymbols.includes(e.key)) {
        e.preventDefault();
      }
      typeof onKeyDown === "function" && onKeyDown(e);
    }

    return (
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        className={`${styles["input"]} ${
          disabled ? styles["disabled"] : ""
        } ${className}`}
        placeholder={placeholder}
        type={type}
        pattern={type === "number" ? "[0-9]*" : ".{0,}"}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        onKeyDown={onKeyDownHandler}
        aria-required={ariaRequired}
        aria-invalid={ariaInvalid}
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
      />
    );
  }
);
BasicInput.displayName = "BasicInput";

export default BasicInput;
