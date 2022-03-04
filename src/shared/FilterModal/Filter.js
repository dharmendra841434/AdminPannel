import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ImCross } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { getArrayElements } from "../../features/appSlice";
import ColmnList from "./List.json";

function Filter({
  open,
  onClose,
  HandleCheck,
  IsChecked,
  List,
  GeneratedList,
  HandleDragEnd,
  Save,
}) {
  ColmnList.data = GeneratedList;
  //console.log(GeneratedList);
  const dispatch = useDispatch();
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(ColmnList.data);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    //console.log(tempData);
    ColmnList.data = tempData;
    dispatch(getArrayElements(ColmnList.data));
    //setmyList(tempData);
    // console.log(ColmnList.data);
  };

  // const data = useSelector((state) => state.app.filter);
  // console.log(data);
  // console.log(ColmnList.data);
  if (!open) return null;
  return createPortal(
    <div className=" fixed top-36 left-96 right-0 bottom-0 z-10 bg-yellow-700  h-96 p-2 w-1/2">
      <button className="ml-2 mt-2" onClick={onClose}>
        Close
      </button>
      <div className=" justify-center ml-56">
        {List.map((item, index) => (
          <div key={index}>
            <input value={item} type="checkbox" onChange={HandleCheck} />
            <span className={IsChecked(item)}>{item}</span>
          </div>
        ))}
      </div>
      <div className=" border-2  h-32 bg-white w-full border-borderColor">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div>
            <Droppable droppableId="droppable-1" direction="horizontal">
              {(provider) => (
                <div
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                  className="flex flex-row"
                >
                  {ColmnList.data.map((item, index) => (
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
      <button onClick={Save} className=" bg-blue-400 p-2 rounded mt-2 ml-72">
        Save Changes
      </button>
    </div>,
    document.getElementById("modal")
  );
}

export default Filter;
