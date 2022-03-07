import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  getArrayElements,
  setDefaultColumn,
  CountItems,
} from "../../features/filterSlice";
import { checkList } from "./dummy-data";

function Filter(props) {
  const [checked, setChecked] = useState([]);
  const [FinalList, setFinalList] = useState([]);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.Filter.filter);
  const Default = useSelector((state) => state.Filter.DefaultColumn);
  useEffect(() => {}, [data, Default]);

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    setFinalList(updatedList);
    dispatch(CountItems(updatedList.length));
    // console.log(updatedList.length);
  };
  const total = useSelector((state) => state.Filter.totalItems);
  //console.log(total);

  // Return classes based on whether item is checked
  let isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = FinalList;
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setFinalList(tempData);
  };

  if (!props.open) return null;
  return createPortal(
    <div className=" fixed top-36 left-96 right-0 bottom-0 z-10 bg-yellow-700  h-96 p-2 w-1/2">
      <button className="ml-2 mt-2" onClick={props.onClose}>
        Close
      </button>
      <div className=" justify-center ml-56">
        {checkList.map((item, index) => (
          <div key={index}>
            <input
              value={item}
              type="checkbox"
              onChange={total < 6 ? handleCheck : null}
            />
            <span className={isChecked(item)}>{item}</span>
          </div>
        ))}
      </div>
      <div className=" border-2 h-20 bg-white w-full border-borderColor">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div>
            <Droppable droppableId="droppable-1" direction="horizontal">
              {(provider) => (
                <div
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                  className="flex flex-row"
                >
                  {FinalList.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provider) => (
                        <div
                          {...provider.draggableProps}
                          ref={provider.innerRef}
                          {...provider.dragHandleProps}
                          className="bg-gray-600 w-28 p-0.5 flex flex-row items-center justify-center rounded mt-1 ml-1"
                        >
                          {item}
                          <ImCross color="#2e2c2c" className=" ml-2" />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provider.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
      <h3>6/{total}</h3>
      {total != 6 ? null : <h2>Maximum 6 items can be Selected</h2>}
      <button
        onClick={() => {
          dispatch(getArrayElements(FinalList));
          dispatch(setDefaultColumn(false));
        }}
        className=" bg-blue-400 p-2 rounded mt-2 ml-72"
      >
        Save Changes
      </button>
    </div>,
    document.getElementById("modal")
  );
}

export default Filter;
