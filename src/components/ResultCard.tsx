import { Typography } from "@mui/material";
import React from "react";

interface MyComponentProps {
    position: number;
    winner: number;
    rating: number;
    diff: number;
}

const ResultCard: React.FC<MyComponentProps> = ({position, winner, rating, diff}) => {

    
    const diffStr = `${diff >= 0 ? '+' : ''}${diff}`;

    if (winner == 0) {
        return (
            <div className="w-full h-full border-2 border-gray-400 rounded-2xl flex justify-center items-center">
                <Typography sx={{ typography: { xs:'h5', md:'h6', lg:'h3' } }} style={{fontWeight: 700}} className="pb-[20px]">{rating} ({diffStr})</Typography>
            </div>
        );
    } else if (winner == position) {
        return (
            <div className="w-full h-full border-2 border-green-400 rounded-2xl flex flex-col justify-center items-center text-center">
                <Typography sx={{ typography: { xs:'h5', md:'h6', lg:'h3' } }} style={{fontWeight: 700}} className="pb-[10px]">Winner:</Typography>
                <Typography sx={{ typography: { xs:'h5', md:'h6', lg:'h3' } }} style={{fontWeight: 700}}>Rating: {rating} <span className="text-green-400">({diffStr})</span></Typography>
            </div>
        );
    } else if (winner != position) {
        return (
            <div className="w-full h-full border-2 border-red-400 rounded-2xl flex flex-col justify-center items-center text-center">
                <Typography sx={{ typography: { xs:'h5', md:'h6', lg:'h3' } }} style={{fontWeight: 700}} className="pb-[10px]">Loser:</Typography>
                <Typography sx={{ typography: { xs:'h5', md:'h6', lg:'h3' } }} style={{fontWeight: 700}} className="">Rating: {rating} <span className="text-red-400">({diffStr})</span></Typography>
            </div>
        );
    }

}

export default ResultCard;