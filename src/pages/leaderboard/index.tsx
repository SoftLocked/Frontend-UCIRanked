import { logEvent } from "firebase/analytics";
import { analytics } from "../../lib/firebase";
import React, { useEffect, useState } from "react";
import LeaderboardItem from "@/components/LeaderboardItem";
import { Typography } from "@mui/material";
import TopNav from "@/components/TopNav";

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface TakeTypeNoID {
    content: string;
    createdAt: Date;
    elo: number;
}

interface TakeType {
    content: string;
    createdAt: Date;
    elo: number;
}

const Leaderboard = () => {

    const [takes, setTakes] = useState<TakeType[]>([]);

    async function getTop100() {
        try {
            const collectionRef = collection(db, "Takes");
            const q = query(collectionRef, orderBy("elo", "desc"), limit(100));
        
            const snapshot = await getDocs(q);
            const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as TakeTypeNoID) }));

            setTakes(docs);
          } catch (error) {
            console.error("Error getting documents:", error);
          }
    }

    useEffect(() => {
        if (analytics) {
            logEvent(analytics, "page_view", { page_path: '/leaderboard' });
        }
        getTop100();
    }, []);

    return ( 
        <React.Fragment>
            <TopNav/>
            <div className="flex justify-center">
                <div className="w-[100vw] xl:w-[50vw]">
                    <div className="grid grid-cols-12 rounded-2xl m-4 p-3">
                        <div className="...">
                            <Typography sx={{ typography: { xs:'body1' }}} style={{fontWeight: 500}} className="text-left">Position</Typography>
                        </div>
                        <div className="col-span-10">
                            <Typography sx={{ typography: { xs:'body1' }}} style={{fontWeight: 500}} className="text-center">Content</Typography>
                        </div>
                        <div className="...">
                            <Typography sx={{ typography: { xs:'body1' }}} style={{fontWeight: 500}} className="text-right">Elo</Typography>
                        </div>
                    </div>
                    {takes.map((take, index) => (
                        <LeaderboardItem key={index} position={index+1} content={take.content} elo={take.elo}/>
                    ))}
                    
                </div>
            </div>
        </React.Fragment>
    );
}
 
export default Leaderboard;