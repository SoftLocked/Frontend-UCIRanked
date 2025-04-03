import TopNav from "@/components/TopNav";
import { Typography } from "@mui/material";
import React, { useRef, useState } from "react";


const Take = () => {

    const [take, setTake] = useState('');


    function handleChange(event:any) {
        setTake(event.target.value);
    }

    function handleSubmit(event:any) {
        event.preventDefault();
        console.log(take);
        setTake('');
    }

    return (
        <React.Fragment>
            <TopNav/>
            <div className="flex justify-center m-[25px] md:m-[50px]">
                <div>
                    <Typography sx={{ typography: { xs:'h3', lg:'h1' } }} style={{fontWeight: 700}} className="text-center">Make your Take</Typography>
                </div>
            </div>

            <div className="flex justify-center">
                <form className="w-[100vw] md:w-[50vw]">   
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <input type="text" value={take} className="block w-full p-4 text-sm border-b-2 border-white placeholder-gray-50" placeholder="Make your Take" required style={{outline: 'none'}} onChange={handleChange}/>
                        <button className="text-white absolute end-2.5 bottom-2.5 ring-1 font-medium rounded-lg text-sm px-4 py-2 transition duration-500 ease-in-out hover:bg-white hover:text-black" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
     );
}
 
export default Take;