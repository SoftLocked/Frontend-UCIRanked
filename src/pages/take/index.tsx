import TopNav from "@/components/TopNav";
import { Typography } from "@mui/material";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";

import { collection, addDoc, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";

import { logEvent } from "firebase/analytics";
import { analytics } from "../../lib/firebase";
import SuccessFailure from "@/components/SuccessFailure";

interface TakeTypeNoID {
    content: string;
    createdAt: Date;
    elo: number;
}

const Take = () => {

    const [success, setSuccess] = useState(-1);

    const [take, setTake] = useState('');

    const [canTake, setCantake] = useState(true);

    useEffect(() => {
        if (analytics) {
            logEvent(analytics, "page_view", { page_path: '/take' });
        }
    }, []);

    async function addTake() {
        try {
            await addDoc(collection(db, "Takes"), {
              content: take.trim(),
              elo: 1000,
              createdAt: new Date()
            });
          } catch (error) {
            console.error("Error adding document: ", error);
          }
    }

    async function checkIfTakeExists(take:string) {
        try {
            const collectionRef = collection(db, "Takes");
            const q = query(collectionRef, where("content", "==", take), limit(1));
        
            const snapshot = await getDocs(q)

            const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as TakeTypeNoID) }));

            return docs.length == 1;

        } catch (error) {
        console.error("Error getting documents:", error);
        }
      }

    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        setTake(event.target.value);
    }

    async function handleSubmit(event:MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        const exists = await checkIfTakeExists(take.trim());

        if (take.trim().length <= 50 && take.trim().length > 0 && exists == false && canTake == true) {
            console.log('exists', exists);
            addTake();
            setTake('');
            setSuccess(1);
            setCantake(false);
            setTimeout(() => {setCantake(true)}, 10000);
        } else {
            setSuccess(0);
        }
        
        if (analytics) {
            logEvent(analytics, "button_click", {
                button_name: "Submit Button",
            });
        }
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
                        <input type="text" value={take} className=" dark:text-white block w-full p-4 text-sm border-b-2 border-black dark:border-white placeholder-black dark:placeholder-gray-50" placeholder="Make your Take" required style={{outline: 'none'}} onChange={handleChange}/>
                        <button className="dark:text-white absolute end-2.5 bottom-2.5 ring-1 font-medium rounded-lg text-sm px-4 py-2 transition duration-500 ease-in-out hover:bg-white hover:text-black" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>

            <div className="flex justify-center">
                <SuccessFailure success={success}/>
            </div>
        </React.Fragment>
     );
}
 
export default Take;