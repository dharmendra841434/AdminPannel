import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import img from "../app/assets/img/man.svg";
import { BsThreeDots } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import { dummy } from "../dummy";
import { isEmptyObject } from "../shared/helper";

const ClientList = () => {
  const [currentResults, setCurrentResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(3);
  const [show, setShow] = useState({});

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggle = (id) => {
    if (isEmptyObject(show)) {
      dummy.filter((record) => {
        if (record.id === id) {
          return setShow(record);
        }
        return;
      });
    } else {
      setShow({});
    }
  };

  useEffect(() => {
    setCurrentResults(dummy.slice(indexOfFirstResult, indexOfLastResult));
  }, [indexOfFirstResult, indexOfLastResult]);
  return (
    <div className="px-24 py-8 ">
      {currentResults.length > 0 &&
        currentResults.map((data) => {
          return (
            <div key={data.id} className=" rounded-md">
              <div
                onClick={() => toggle(data.id)}
                className="flex justify-between items-center border-b border-gray-100 bg-white px-6 py-2 pt-4"
              >
                <div className="bg-gray-50 p-2">
                  <img src={img} alt="" />
                </div>
                <div>
                  <div className="hover:underline cursor-pointer text-gray-600">
                    {data.clientId}
                  </div>
                  <div className="text-sm text-greyText">Client ID</div>
                </div>
                <div>
                  <div className="text-gray-600">{data.names}</div>
                  <div className="text-sm text-greyText">Names</div>
                </div>
                <div>
                  <div className="text-gray-600">{data.username}</div>
                  <div className="text-sm text-greyText">Username</div>
                </div>
                <div>
                  <div className="text-gray-600">{data.country}</div>
                  <div className="text-sm text-greyText">Country</div>
                </div>
                <div>
                  <div className="text-gray-600">{data.telephone}</div>
                  <div className="text-sm text-greyText">Telephone</div>
                </div>
                <div>
                  <div className="text-gray-600">{data.status}</div>
                  <div className="text-sm text-greyText">Status</div>
                </div>
                <div>
                  <BsThreeDots className="text-greyText text-lg" />
                </div>
              </div>
              <div
                className={`${
                  data.id === show.id ? "" : "hidden"
                } flex justify-center items-start pb-12 bg-white }>
                <div className="w-1/2 px-8`}
              >
                <div className="w-1/2 px-8">
                  <div className="flex justify-between items-center py-2">
                    <div className="text-gray-400 text-sm">
                      Client Application Form
                    </div>
                    <div>
                      <FaFilePdf className="text-red-600 text-2xl" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="text-gray-400 text-sm">
                      Declaration of source of funds
                    </div>
                    <div>
                      <FaFilePdf className="text-red-600 text-2xl" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="text-gray-400 text-sm">
                      Declaration of source of wealth{" "}
                    </div>
                    <div>
                      <FaFilePdf className="text-red-600 text-2xl" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="text-gray-400 text-sm">
                      Politically exposed person
                    </div>
                    <div>
                      <FaFilePdf className="text-red-600 text-2xl" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="text-gray-400 text-sm">
                      Client Agreement
                    </div>
                    <div>
                      <FaFilePdf className="text-red-600 text-2xl" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="text-gray-400 text-sm">
                      Identification documents
                    </div>
                    <div></div>
                  </div>
                  <div className="flex justify-between items-center py-2 ">
                    <div className="text-gray-400 text-sm">Status </div>
                    <div className="text-gray-700 text-sm">{data.status}</div>
                  </div>
                </div>
                <div className="w-1/2 flex justify-around items-start mt-4">
                  <div>
                    <button className="px-16 rounded-sm font-medium  py-2 text-white  bg-greenBtn">
                      Verify
                    </button>
                  </div>
                  <div>
                    <button className="px-16 rounded-sm font-medium py-2 text-white bg-redBtn">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <Pagination
        resultsPerPage={resultsPerPage}
        totalResults={dummy.length}
        paginate={paginate}
        currentResults={currentResults}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ClientList;
