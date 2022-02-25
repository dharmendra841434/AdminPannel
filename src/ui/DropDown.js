import React, { useState } from "react";
import DropDownWrapper from "./dropDown/DropDownWrapper";
const DropDown = (props) => {
  const [a, setA] = useState(false);
  const bbb = () => {
    return true;
  };
  return (
    <div>
      {props.dropDownList.map((item) => {
        // if (item.hasDropDown === true)
        //   return (
        //     <DropDownWrapper
        //       right="right-24"
        //       state={a}
        //       toggle={bbb}
        //       dropDownName={"xxx"}
        //     >
        //       <div className="py-2 px-4 text-center">{item.name}</div>
        //     </DropDownWrapper>
        //   );
        // else {
        return <div className="py-2 px-4 text-center">{item.name}</div>;
        // }
      })}
    </div>
  );
};

export default DropDown;
