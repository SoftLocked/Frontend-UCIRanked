import TopNav from "@/components/TopNav";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import ResultCard from "@/components/ResultCard";

export default function Home() {

  const [winner, setWinner] = useState('');

  function handleLeft() {
    setWinner('left');
  }

  function handleRight() {
    setWinner('right');
  }

  function handleTie() {

  }

  return (
    <React.Fragment>
      <TopNav/>
      <div className="grid grid-cols-12 gap-4 h-[750px]">
        <div className="col-span-5 ml-10 mt-10">
          <ResultCard position="left" winner="right"/>
        </div>
        <div className="col-span-2 flex flex-col gap-4 justify-center items-center text-center">
          <div className="flex flex-row gap-2">
            <Button variant="contained" className="w-[100px]" color="primary"><Typography variant="h6">Left</Typography></Button>
            <Button variant="contained" className="w-[100px]"><Typography variant="h6">Right</Typography></Button>
          </div>
          <Button variant="contained" className="w-[100px]"><Typography variant="h6">Tie</Typography></Button>
        </div>
        <div className="col-span-5 mr-10 mt-10">
          <ResultCard position="right" winner="right"/>
        </div>
      </div>
    </React.Fragment>
  );
}
//<iframe src="/Hari_Resume.pdf" width="100%" height="100%" />