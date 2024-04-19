import React, { FC } from "react";
import "./index.css";
interface InputKey {
  value: string;
  onKeyDown: (e:any ) => void;
  onChange: (value: string) => void;
}
const Input: FC<InputKey> = ({ onKeyDown, onChange, value }) => {
  return (
    <input
      type="text"
      className="search"
      onKeyDown={(e) => onKeyDown(e)}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      placeholder="Search City..."
    />
  );
};

export default Input;
