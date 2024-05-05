import React, { forwardRef } from "react";
import "../../styles/basic/Input.css";

const Input = forwardRef(
  (
    {
      onkeydown,
      onfocus,
      value,
      type,
      onChange,
      placeholder,
      size,
      color,
      border,
      name,
    },
    ref
  ) => {
    const className = `Input ${size} ${color} ${border}`;
    return (
      <input
        className={className}
        type={type}
        onChange={onChange}
        onKeyDown={onkeydown}
        onFocus={onfocus}
        placeholder={placeholder}
        value={value}
        name={name}
        ref={ref}
      />
    );
  }
);

export default Input;
