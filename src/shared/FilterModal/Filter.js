import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { setisOpen } from "../../features/filterSlice";
import {
  getArrayElements,
  setDefaultColumn,
  CountItems,
} from "../../features/filterSlice";
import { checkList } from "./dummy-data";

function Filter(props) {
  const [checked, setChecked] = useState([]);
  const [FinalList, setFinalList] = useState([]);
  const [ischecked, setischecked] = useState(false);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.Filter.filter);
  const Default = useSelector((state) => state.Filter.DefaultColumn);
  useEffect(() => {}, [data, Default]);

  // Add/Remove checked item from list
  const handleCheck = (event, index) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    // console.log(updatedList);
    setFinalList(updatedList);
    dispatch(CountItems(updatedList.length));
    checkList[index].ischecked = true;
  };
  const total = useSelector((state) => state.Filter.totalItems);
  const open = useSelector((state) => state.Filter.isOpen);
  //console.log(FinalList);

  // Return classes based on whether item is checked
  let isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = FinalList;
    var sourceData = tempData.splice(e.source.index, 1);
    console.log(sourceData);
    tempData.splice(e.destination.index, 0, sourceData.toString());
    setFinalList(tempData);
  };

  if (!open) return null;
  return createPortal(
    <div className=" fixed top-40 drop-shadow-2xl rounded left-96 right-0 bottom-0 z-10 bg-yellow-700  h-96 p-2 w-1/2">
      <ImCross
        className=" ml-1 mt-1 hover:text-blue-500"
        onClick={() => {
          dispatch(setisOpen(false));
        }}
      />
      <div className=" justify-center ml-56">
        {checkList.map((item, index) => (
          <div key={index}>
            <input
              disabled={total < 6 ? false : !item.ischecked}
              value={item.title}
              // defaultChecked={}
              checked={item.ischecked}
              type="checkbox"
              onChange={(event) => {
                handleCheck(event, index);
              }}
            />
            <span className={isChecked(item.title)}>{item.title}</span>
          </div>
        ))}
      </div>
      <div className=" border-2 rounded h-20 bg-white w-full border-borderColor">
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
          if (FinalList.length === 0) {
            console.log("please select one");
          } else {
            dispatch(getArrayElements(FinalList));
            dispatch(setDefaultColumn(false));
            dispatch(setisOpen(false));
          }
        }}
        className=" bg-blue-400 p-2 rounded mt-2 ml-80 justify-center"
      >
        Save Changes
      </button>
    </div>,
    document.getElementById("modal")
  );
}

export default Filter;
