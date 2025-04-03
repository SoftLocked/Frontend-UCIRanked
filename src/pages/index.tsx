import TopNav from "@/components/TopNav";
import React, { useState } from "react";
import { Button, createTheme, Typography } from "@mui/material";
import ResultCard from "@/components/ResultCard";
import HotTakeCard from "@/components/HotTakeCard";


export default function Home() {

  const [winner, setWinner] = useState(-1);

  function handleLeft() {
    setWinner(1);
    console.log('clicked left!');
  }

  function handleRight() {
    setWinner(2);
    console.log('clicked right!');
  }

  function handleTie() {
    setWinner(0);
    console.log('clicked tie!');
  }

  return (
    <React.Fragment>
      <TopNav/>
      <div className="flex justify-center m-[25px] md:m-[50px]">
        <div>
            <Typography sx={{ typography: { xs:'h3', lg:'h1' } }} style={{fontWeight: 700}} className="text-center ">Rank The People's Hottest Takes</Typography>
            <Typography sx={{ typography: { xs:'h4', lg:'h2' } }} style={{fontWeight: 700}} className="text-center ">Which one's the Hottest?</Typography>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 min-h-[500px]">
        <div className="col-span-full md:col-span-4 m-10" onClick={handleLeft}>
            <HotTakeCard take="you can pee without pooping but you cant poo without peeing"/>
        </div>
        <div className="col-span-full md:col-span-4 flex flex-col gap-4 justify-center items-center text-center">
          <div className="flex flex-row gap-2">
          </div>
          <button className="border-2 border-blue-400 rounded-2xl p-10 cursor-pointer transition duration-500 ease-in-out hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-2xl w-[200px]" onClick={handleTie}><Typography variant="h3" style={{fontWeight: 700}}>Tie</Typography></button>
        </div>
        <div className="col-span-full md:col-span-4 m-10" onClick={handleRight}>
          {winner ? <HotTakeCard take="Christmas should only be celebrated post Thanksgiving"/>
        </div>
      </div>
    </React.Fragment>
  );
}
//<iframe src="/Hari_Resume.pdf" width="100%" height="100%" />