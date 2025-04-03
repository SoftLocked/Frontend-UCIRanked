import { Typography } from "@mui/material";
import React from "react";

const ResultCard = (props: any) => {

    let {position, winner, rating, diff} = props;

    if (winner > 0) {
        winner = winner == position
    }

    switch (winner) {
        case 0:
            return (
                <div className="w-full h-full border-2 border-gray-400 rounded-2xl flex justify-center items-center">
                    <Typography sx={{ typography: { xs:'h5', md:'h6', lg:'h3' } }} style={{fontWeight: 700}} className="pb-[20px]">{rating} ({diff})</Typography>
                </div>
            );
        case true:
            return (
                <div className="w-full h-full border-2 border-green-400 rounded-2xl flex justify-center items-center">
                    <Typography sx={{ typography: { xs:'h5', md:'h6', lg:'h3' } }} style={{fontWeight: 700}} className="pb-[20px]">{rating} ({diff})</Typography>
                </div>
            );
        case false:
            return (
                <div className="w-full h-full border-2 border-red-400 rounded-2xl flex justify-center items-center">
                    <Typography sx={{ typography: { xs:'h5', md:'h6', lg:'h3' } }} style={{fontWeight: 700}} className="pb-[20px]">{rating} ({diff})</Typography>
                </div>
            );
    }

}

export default ResultCard;