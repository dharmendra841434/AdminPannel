import React, { useState } from 'react'
import { filterData } from './dummy-data';
import { createPortal } from "react-dom";

function Filter({ open, onClose }) {

    const [checked, setchecked] = useState("");
    const [list, setlist] = useState([])
    list.push(checked)

    const List = list.filter((el) => {
        return el !== '' && typeof el !== 'undefined';
    });
    console.log(List);

    if (!open) return null
    return createPortal(
        <div className=' fixed top-36 left-56 right-0 bottom-0 z-10 bg-yellow-700 h-96 p-2 w-1/2'>
            <button className='ml-2 mt-2' onClick={onClose}>Close</button>
            <div className=' justify-center ml-56'>
                {filterData.map((item) => (
                    <div className='justify-center'>
                        <input type='checkbox' onChange={() => { setchecked(item) }} /><samp className=' ml-4'>{item.type}</samp>
                    </div>
                ))}

            </div>
            <div className=' border-2  h-20 bg-white w-full border-borderColor'>
                {list.map((item) => (
                    <div className=' flex flex-row' >
                        <tr>
                            <td>
                                {item.type}
                            </td>
                        </tr>
                    </div>
                ))}
            </div>
            <button onClick={() => { alert("save") }} className=' bg-blue-400 p-2 rounded mt-2 ml-72'>Save Changes</button>
        </div>
        , document.getElementById("modal")
    )


}

export default Filter