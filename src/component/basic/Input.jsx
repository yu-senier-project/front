// Input - ref(ux), onkeydown, onfocus, value, type, onChange,  placeholder, size, color, border

import { useState } from "react";
import "../../styles/basic/Input.css";

export default function Input({
  ref, // 페이지 이동시 포커스
  onkeydown, // 키보드 다른거 눌렀을때 버튼
  onfocus, // 포커스왔을때
  value, // 기본값
  type,
  onChange,
  placeholder,
  size,
  color,
  border,
}) {
  const className = `Input ${size} ${color} ${border}`;
  return (
    <input
      className={className}
      type={type}
      onChange={onChange}
      ref={ref}
      onkeydown={onkeydown}
      onfocus={onfocus}
      placeholder={placeholder}
      value={value}
    ></input>
  );
}
