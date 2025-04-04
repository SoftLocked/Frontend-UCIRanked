import TopNav from "@/components/TopNav";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ResultCard from "@/components/ResultCard";
import HotTakeCard from "@/components/HotTakeCard";
import EloRank from "elo-rank";

import { collection, doc, updateDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

import { logEvent } from "firebase/analytics";
import { analytics } from "../lib/firebase";

interface TakeType {
    content: string;
    createdAt: Date;
    elo: number;
}

export default function Home() {

    const [leftID, setLeftID] = useState('');
    const [rightID, setRightID] = useState('');

    const [leftTake, setLeftTake] = useState('Default Value Left');
    const [rightTake, setRightTake] = useState('Default Value Right');

    const [winner, setWinner] = useState(-1);

    const [playerOneDiff, setPlayerOneDiff] = useState(0);
    const [playerTwoDiff, setPlayerTwoDiff] = useState(0);

    const [playerOneRating, setPlayerOneRating] = useState(1000);
    const [playerTwoRating, setPlayerTwoRating] = useState(1000);
    

    function calculateNewRatings(win:number) {
        const elo = new EloRank(32);

        const expectedOne = elo.getExpected(playerOneRating, playerTwoRating);
        const expectedTwo = elo.getExpected(playerTwoRating, playerOneRating);

        let newRatingOne = 0;
        let newRatingTwo = 0;

        if (win === 1) {
            newRatingOne = elo.updateRating(expectedOne, 1, playerOneRating);
            newRatingTwo = elo.updateRating(expectedTwo, 0, playerTwoRating);
        } else {
            newRatingOne = elo.updateRating(expectedOne, 0, playerOneRating);
            newRatingTwo = elo.updateRating(expectedTwo, 1, playerTwoRating);
        }

        setPlayerOneDiff(newRatingOne - playerOneRating);
        setPlayerTwoDiff(newRatingTwo - playerTwoRating);

        setPlayerOneRating(newRatingOne);
        setPlayerTwoRating(newRatingTwo);
    };

    async function getTakes() {
        const querySnapshot = await getDocs(collection(db, "Takes"));
        const takes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as TakeType),
        }));
        const firstIndex = Math.floor(Math.random() * takes.length);
        const firstSelection = takes[firstIndex];

        let secondIndex = Math.floor(Math.random() * takes.length);
        while (firstIndex == secondIndex) {
            secondIndex = Math.floor(Math.random() * takes.length);
        }
        const secondSelection = takes[secondIndex];

        setLeftTake(firstSelection.content);
        setRightTake(secondSelection.content);

        setPlayerOneRating(firstSelection.elo);
        setPlayerTwoRating(secondSelection.elo);

        setLeftID(firstSelection.id);
        setRightID(secondSelection.id);
    }

    async function postElo() {
        if (!leftID || !rightID) {
            return;
        }
        try {
            const leftRef = doc(db, "Takes", leftID);
        
            await updateDoc(leftRef, {
              elo: playerOneRating,
            });
        
            const rightRef = doc(db, "Takes", rightID);
        
            await updateDoc(rightRef, {
              elo: playerTwoRating,
            });
          } catch (error) {
            console.error("Error updating document: ", error);
          }
    }

    function handleLeft() {
        setWinner(1);
        console.log('clicked left!');
        console.log(`Old: ${playerOneRating}(${playerOneDiff}) | ${playerTwoRating}(${playerTwoDiff})`);
        calculateNewRatings(1);

        if (analytics) {
          logEvent(analytics, "button_click", {
            button_name: "Left Button",
          });
        }
    }

    function handleRight() {
        setWinner(2);
        console.log('clicked right!');
        console.log(`Old: ${playerOneRating}(${playerOneDiff}) | ${playerTwoRating}(${playerTwoDiff})`);
        calculateNewRatings(2);

        if (analytics) {
          logEvent(analytics, "button_click", {
            button_name: "Right Button",
          });
        }
    }

    function handleTie() {
        if (winner == -1) { // Tie
            setWinner(0);
            setPlayerOneDiff(0);
            setPlayerTwoDiff(0);

            if (analytics) {
              logEvent(analytics, "button_click", {
                button_name: "Tie Button",
              });
            }
        } else { // Next
            setWinner(-1);
            getTakes();

            if (analytics) {
              logEvent(analytics, "button_click", {
                button_name: "Next Button",
              });
            }
        }
    }

    useEffect(() => {
        getTakes();
        if (analytics) {
          logEvent(analytics, "page_view", { page_path: '/' });
        }
    }, []);

    useEffect(() => {
        postElo();
    }, [playerOneRating, playerTwoRating]);


    return (
        <React.Fragment>
            <TopNav />
            <div className="flex justify-center m-[25px] md:m-[50px]">
                <div>
                    <Typography sx={{ typography: { xs: 'h3', lg: 'h1' } }} style={{ fontWeight: 700 }} className="text-center ">Rank The People&apos;s Hottest Takes</Typography>
                    <Typography sx={{ typography: { xs: 'h4', lg: 'h2' } }} style={{ fontWeight: 700 }} className="text-center ">Which one&apos;s the Hottest?</Typography>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 min-h-[500px]">
                {winner < 0 ?
                    <div className="col-span-full md:col-span-4 m-10" onClick={handleLeft}>
                        <HotTakeCard take={leftTake} />
                    </div> :
                    <div className="col-span-full md:col-span-4 m-10">
                        <ResultCard position={1} winner={winner} rating={playerOneRating} diff={playerOneDiff}/>
                    </div>
                }
                <div className="col-span-full md:col-span-4 flex flex-col gap-4 justify-center items-center text-center">
                    <button className="border-2 border-blue-400 rounded-2xl p-10 cursor-pointer transition duration-500 ease-in-out hover:bg-blue-400 dark:text-white font-bold py-2 px-4 rounded-2xl w-[200px]" onClick={handleTie}><Typography variant="h3" style={{ fontWeight: 700 }}>{winner == -1 ? "Tie" : "Next"}</Typography></button>
                </div>
                {winner < 0 ?
                    <div className="col-span-full md:col-span-4 m-10" onClick={handleRight}>
                        <HotTakeCard take={rightTake} />
                    </div> :
                    <div className="col-span-full md:col-span-4 m-10">
                        <ResultCard position={2} winner={winner} rating={playerTwoRating} diff={playerTwoDiff} />
                    </div>
                }
            </div>
        </React.Fragment>
    );
}
//<iframe src="/Hari_Resume.pdf" width="100%" height="100%" />