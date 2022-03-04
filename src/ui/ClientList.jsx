import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  callsDataRequest,
  callsDataWithParamsRequest,
  getList,
  singleCall,
} from "../features/callSlice";
import Spinner from "./Spinner";
import Pagination from "./Pagination";
import { isEmptyObject, strClip } from "../shared/helper";
import { getDivHeight } from "../features/appSlice";
import { convertSecondsTo, buttonName } from "../shared/helper";
import {
  ArrowUp,
  ArrowDown,
  PlayIcon,
  DownloadIcon,
  CloseIcon,
} from "../app/assets/icons/icons";
import jpgAvatar from "../app/assets/img/jpgAvatar.jpg";
import Filters from "./Filters";
import Modal from "../shared/FilterModal/Modal";
import { DefaultColmn } from "../shared/DefaultColmn";
import Filter from "../shared/FilterModal/Filter";
import { checkList } from "../shared/FilterModal/dummy-data";

const ClientList = (props) => {
  const dispatch = useDispatch();
  const callsList = useSelector((state) => state.calls.calls);
  const search = useSelector((state) => state.app.searchTerm);
  // const audioStream = useSelector((state) => state.calls.stream);
  const divRef = useRef(null);
  //Pagination
  const [currentResults, setCurrentResults] = useState([]);
  const [downloadActive, setDownloadActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(50);
  const [DefaultClmn, setDefaultClmn] = useState(true);
  const [Rerender, setRerender] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [FinalList, setFinalList] = useState([]);
  const [show, setShow] = useState({});
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;

  let updatedList = [];

  // Sorting
  const [order, setOrder] = useState("asc");
  const [old, setOld] = useState(true);

  const sorting = (col) => {
    if (order === "asc") {
      const sorted = [...callsList].sort((a, b) => {
        return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
      });
      dispatch(getList(sorted));
      setOrder("dsc");
    }
    if (order === "dsc") {
      const sorted = [...callsList].sort((a, b) => {
        return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
      });
      dispatch(getList(sorted));
      setOrder("asc");
    }
  };
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const toggle = (id) => {
    if (isEmptyObject(show)) {
      callsList.filter((record) => {
        if (record.id === id) {
          return setShow(record);
        }
        return false;
      });
    } else {
      setShow({});
    }
  };
  const details = {
    date_start: "2022-01-15",
    date_end: "2022-01-20",
    in_out: "пусто",
  };
  const handleDownload = (record, partnerId) => {
    const obj = {
      recordId: record,
      partnerId: partnerId,
    };
    dispatch(singleCall(obj));
  };
  const numberSort = (col) => {
    if (!old) {
      const sorted = [...callsList].sort((a, b) => {
        return parseInt(a[col]) - parseInt(b[col]);
      });
      dispatch(getList(sorted));
      setOld(true);
    } else {
      const sorted = [...callsList].sort((a, b) => {
        return parseInt(b[col]) - parseInt(a[col]);
      });
      dispatch(getList(sorted));
      setOld(false);
    }
  };
  useEffect(() => {
    details.date_start === ""
      ? dispatch(callsDataRequest())
      : dispatch(callsDataWithParamsRequest(details));
  }, [dispatch]);
  useEffect(() => {
    setCurrentResults(callsList.slice(indexOfFirstResult, indexOfLastResult));
  }, [indexOfFirstResult, indexOfLastResult, callsList, callsList.length]);
  useEffect(() => {
    if (divRef && divRef.current && divRef.current.offsetHeight) {
      dispatch(getDivHeight(divRef.current.offsetHeight));
    }
  }, [currentResults.length, dispatch]);

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    setFinalList(updatedList);
    //  console.log(FinalList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  let isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  const data = useSelector((state) => state.app.filter);
  if (data.length === 0) {
    console.log("array is empty");
  } else {
    setFinalList(data);
  }

  // console.log(data);
  useEffect(() => {
    setRerender(false);
  }, [Rerender]);

  return (
    <div ref={divRef} className="2xl:px-24 px-4 py-4 ">
      <div>
        <button
          onClick={() => {
            setisOpen(true);
          }}
        >
          SetFilter
        </button>
        <Filter
          open={isOpen}
          IsChecked={isChecked}
          HandleCheck={handleCheck}
          List={checkList}
          GeneratedList={FinalList}
          Save={() => {
            setDefaultClmn(false);
            setRerender(true);
          }}
          onClose={() => {
            setisOpen(false);
          }}
        />
      </div>
      <div className="grid grid-cols-7 grid-flow-col items-center border-b border-gray-100 bg-white px-6 py-2 pt-4">
        {/* <div className="text-gray-400 ">Client ID</div>
        <div className=" text-left cursor-pointer text-gray-400 ">
          First Name
        </div>
        <div className="text-gray-400 ">Last Name</div>
        <div
          onClick={() => sorting("from_number")}
          className="text-gray-400 hover:text-blue-500 cursor-pointer select-none"
        >
          Country
        </div>
        <div
          onClick={() => sorting("line_number")}
          className="text-gray-400 hover:text-blue-500 cursor-pointer select-none"
        >
          Is Verified
        </div>
        <div className="text-gray-400 mr-4">Status</div>
        <div
          onClick={() => numberSort("time")}
          className="text-gray-400 col-span-2 text-right hover:text-blue-500 cursor-pointer select-none"
        >
          Registration
        </div> */}
        <div className=" w-screen h-10 flex items-center">
          {DefaultClmn
            ? DefaultColmn.map((item) => {
                return (
                  <div className="text-gray-400  hover:text-blue-500 cursor-pointer select-none ml-10">
                    {item.type}
                  </div>
                );
              })
            : FinalList.map((item) => {
                return (
                  <div className="text-gray-400  flex justify-start items-center hover:text-blue-500 cursor-pointer select-none ml-10">
                    {item}
                  </div>
                );
              })}
        </div>
      </div>
      {!search ? (
        currentResults.length === 0 ? (
          <Spinner />
        ) : (
          currentResults.length > 2000 &&
          currentResults.map((data) => {
            return (
              <div key={data.id} className=" rounded-md">
                <div
                  onClick={() => toggle(data.id)}
                  className="grid grid-cols-9 grid-flow-col items-center border-b border-gray-100 bg-white px-6 py-2 pt-4"
                >
                  <div className="flex items-center col-span-2 ">
                    {data.in_out === "1" ? (
                      <div className="p-2 mr-2">
                        <ArrowUp className="text-green-500" />
                      </div>
                    ) : (
                      <div className="p-2 mr-2">
                        <ArrowDown className=" text-darkBlue" />
                      </div>
                    )}
                    <div className="hover:underline cursor-pointer text-gray-600 px-6">
                      {strClip(data.date)}
                    </div>
                    <div className="text-sm text-greyText text-right pl-8">
                      {data.person_avatar ? (
                        <img
                          src={data.person_avatar}
                          className="rounded-full"
                          alt="user avatar"
                        />
                      ) : (
                        <img
                          src={jpgAvatar}
                          className="rounded-full"
                          alt="user avatar"
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-gray-600 col-span-2 pl-8">
                    {data.from_number}
                  </div>

                  <div className="flex justify-between items-center col-span-3 ">
                    <div className="text-gray-600">{data.line_number}</div>
                    <div className=" flex justify-start items-center">
                      <div className=" flex justify-start items-center">
                        {buttonName(data.time) === "green" && (
                          <div
                            className={`h-2 rounded-full w-2 mr-2 bg-green-500`}
                          ></div>
                        )}
                        {buttonName(data.time) === "green" && (
                          <div
                            className={`h-2 rounded-full w-2 mr-2 bg-green-500`}
                          ></div>
                        )}
                        {buttonName(data.time) === "indigo" && (
                          <div
                            className={`h-2 rounded-full w-2 mr-2 
                              bg-${buttonName(data.time)}-500`}
                          ></div>
                        )}
                        <div
                          className={`h-2 rounded-full w-2 mr-2 bg-${buttonName(
                            data.time
                          )}-500`}
                        ></div>
                      </div>
                      <div>
                        <button
                          className={`border bg-opacity-20 rounded-md px-2 py-1 text-sm text-${buttonName(
                            data.time
                          )}-500 bg-${buttonName(
                            data.time
                          )}-500 border-${buttonName(data.time)}-500 `}
                        >
                          {buttonName(data.time) === "red"
                            ? "Плохо"
                            : buttonName(data.time) === "indigo"
                            ? "Хорошо"
                            : buttonName(data.time) === "green" && "Отлично"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-600 col-span-2 text-right pr-2">
                    {convertSecondsTo(data.time)}
                  </div>
                </div>
                <div
                  className={`${
                    data.id === show.id ? "" : "hidden"
                  } flex justify-center items-start pb-4 pt-4 bg-white }>
                <div className="w-1/2 px-8`}
                >
                  {parseInt(data.time) === 0 ? (
                    <div className="w-1/2 px-8 pt-2 mt-4 text-sm text-gray-500">
                      аудио не найдено
                    </div>
                  ) : (
                    <div className="w-1/2 px-8 pt-2 ">
                      <div className="flex justify-between items-center py-2">
                        <div className=" bg-indigo-100 px-8 w-full rounded-3xl py-2 flex justify-between items-center">
                          <div> {convertSecondsTo(data.time)}</div>
                          <div>
                            <div className="p-1 rounded-full bg-white mx-2">
                              <PlayIcon
                                // onClick={() => handlePlay(audioStream)}
                                className=" text-sideBarBtn text-2xl"
                              />
                            </div>
                          </div>
                          <div className="w-full rounded-md h-2 max-w-full bg-media bg-opacity-60">
                            <div className="h-full w-1/2 bg-media  rounded-md"></div>
                          </div>
                          <div title="Скачать звонок" className="  mx-1">
                            <DownloadIcon
                              onClick={() => {
                                setDownloadActive(true);
                                handleDownload(
                                  data.record,
                                  data.partnership_id
                                );
                              }}
                              className="text-gray-500 hover:text-sideBarBtn text-2xl "
                            />
                          </div>
                          {downloadActive && (
                            <div className="  mx-1">
                              <CloseIcon className=" text-sideBarBtn transform scale-125 " />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="w-1/2 flex justify-start items-center mt-4 pt-2">
                    <div className="text-gray-400 text-sm mr-8">Status </div>
                    <div className="text-gray-700 text-sm">{data.status}</div>
                  </div>
                </div>
              </div>
            );
          })
        )
      ) : (
        callsList.length > 0 &&
        callsList
          .filter((data) => {
            if (data.from_number.includes(search)) {
              return data;
            }
            return data;
          })
          .map((data) => {
            return (
              <div key={data.id} className=" rounded-md">
                <div
                  onClick={() => toggle(data.id)}
                  className="grid grid-cols-9 grid-flow-col items-center border-b border-gray-100 bg-white px-6 py-2 pt-4"
                >
                  <div className="flex items-center col-span-2 ">
                    {data.in_out === "1" ? (
                      <div className="p-2 mr-2">
                        <ArrowUp className="text-green-500" />
                      </div>
                    ) : (
                      <div className="p-2 mr-2">
                        <ArrowDown className=" text-darkBlue" />
                      </div>
                    )}
                    <div className="hover:underline cursor-pointer text-gray-600 px-6">
                      {data.id}
                    </div>
                    <div className="text-sm text-greyText text-right pl-8">
                      {data.person_avatar ? (
                        <img
                          src={data.person_avatar}
                          className="rounded-full"
                          alt="user avatar"
                        />
                      ) : (
                        <img
                          src={jpgAvatar}
                          className="rounded-full"
                          alt="user avatar"
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-gray-600 col-span-2 pl-8">
                    {data.from_number}
                  </div>

                  <div className="flex justify-between items-center col-span-3 ">
                    <div className="text-gray-600">{data.line_number}</div>
                    <div className=" flex justify-start items-center">
                      <div className=" flex justify-start items-center">
                        {buttonName(data.time).class === "green" && (
                          <div
                            className={`h-2 rounded-full w-2 mr-2 bg-${
                              buttonName(data.time).class
                            }-500`}
                          ></div>
                        )}
                        {buttonName(data.time).class === "green" && (
                          <div
                            className={`h-2 rounded-full w-2 mr-2 bg-${
                              buttonName(data.time).class
                            }-500`}
                          ></div>
                        )}
                        {buttonName(data.time).class === "green" ||
                          (buttonName(data.time).class === "indigo" && (
                            <div
                              className={`h-2 rounded-full w-2 mr-2 bg-${
                                buttonName(data.time).class
                              }-500`}
                            ></div>
                          ))}
                        <div
                          className={`h-2 rounded-full w-2 mr-2 bg-${
                            buttonName(data.time).class
                          }-500`}
                        ></div>
                      </div>
                      <div>
                        <button
                          className={`border bg-opacity-20 rounded-md px-2 py-1 text-sm text-${
                            buttonName(data.time).class
                          }-500 bg-${buttonName(data.time).class}-500 border-${
                            buttonName(data.time).class
                          }-500 `}
                        >
                          {buttonName(data.time).message}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-600 col-span-2 text-right pr-2">
                    {convertSecondsTo(data.time)}
                  </div>
                </div>
                <div
                  className={`${
                    data.id === show.id ? "" : "hidden"
                  } flex justify-center items-start pb-4 pt-4 bg-white }>
                <div className="w-1/2 px-8`}
                >
                  {parseInt(data.time) === 0 ? (
                    <div className="w-1/2 px-8 pt-2 mt-4 text-sm text-gray-500">
                      аудио не найдено
                    </div>
                  ) : (
                    <div className="w-1/2 px-8 pt-2 ">
                      <div className="flex justify-between items-center py-2">
                        <div className=" bg-indigo-100 px-8 w-full rounded-3xl py-2 flex justify-between items-center">
                          <div> {convertSecondsTo(data.time)}</div>
                          <div>
                            <div className="p-1 rounded-full bg-white mx-2">
                              <PlayIcon
                                // onClick={() => handlePlay(audioStream)}
                                className=" text-sideBarBtn text-2xl"
                              />
                            </div>
                          </div>
                          <div className="w-full rounded-md h-2 max-w-full bg-media bg-opacity-60">
                            <div className="h-full w-1/2 bg-media  rounded-md"></div>
                          </div>
                          <div title="Скачать звонок" className="  mx-1">
                            <DownloadIcon
                              onClick={() => {
                                handleDownload(
                                  data.record,
                                  data.partnership_id
                                );
                              }}
                              className="text-gray-500 hover:text-sideBarBtn text-2xl "
                            />
                          </div>
                          <div className="  mx-1">
                            <CloseIcon className=" text-sideBarBtn transform scale-125 " />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="w-1/2 flex justify-start items-center mt-4 pt-2">
                    <div className="text-gray-400 text-sm mr-8">Status </div>
                    <div className="text-gray-700 text-sm">{data.status}</div>
                  </div>
                </div>
              </div>
            );
          })
      )}
      <Pagination
        resultsPerPage={resultsPerPage}
        totalResults={callsList.length}
        paginate={paginate}
        currentResults={currentResults}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ClientList;
