import React, { useState } from "react";
import arrow from "../app/assets/icons/key-down.svg";
import arrowUp from "../app/assets/icons/keyup.svg";
import DropDown from "./DropDown";
import DropDownWrapper from "./dropDown/DropDownWrapper";

const Filters = () => {
  const [hover, setHover] = useState(true);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(true);
  const [hover3, setHover3] = useState(true);

  const toggle = () => {
    setHover((prev) => !prev);
  };
  const toggle1 = () => {
    setHover1((prev) => !prev);
  };
  const dropDownList = [
    { name: "Все звонки", hasDropDown: true, subList: ["1", "2", "3"] },
    { name: "Новые клиенты", hasDropDown: true, subList: ["1", "2", "3"] },
    { name: "Через приложение", hasDropDown: false },
  ];
  return (
    <DropDownWrapper state={hover} toggle={toggle} dropDownName={"My Menu"}>
      <DropDownWrapper
        state={hover1}
        toggle={toggle1}
        dropDownName={"My Menu 2"}
      >
        <DropDown dropDownList={dropDownList} />
      </DropDownWrapper>
    </DropDownWrapper>
  );
};

export default Filters;
