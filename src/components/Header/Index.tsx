import { FC } from "react";
import "./index.css";
interface Heading {
  value: string;
}

const Header: FC<Heading> = ({ value }) => {
  return (
    <h1 className="text-center">
      {value}<span>🌤</span>
    </h1>
  );
};

export default Header;
