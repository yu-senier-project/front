import React, { forwardRef } from "react";
import "../../styles/basic/Input.css";
import { useState } from "react";
export default function Input({
  reference, // 페이지 이동시 포커스
  onkeydown, // 키보드 다른거 눌렀을때 버튼
  onfocus, // 포커스왔을때
  value, // 기본값
  type,
  onChange,
  placeholder,
  size,
  color,
  border,
  width,
  font,
  style,
  name,
  autocomplete
}) {
  const className = `Input ${size} ${color} ${border} width-${width} font-${font}`;
  return (
    
    <input
      className={className}
      type={type}
      onChange={onChange}
      ref={reference}
      onKeyDown={onkeydown}
      onFocus={onfocus}
      placeholder={placeholder}
      value={value}
      style={style}
      name={name}
      autocomplete ={autocomplete}
    />
   
  );
}
