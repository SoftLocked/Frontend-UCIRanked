import { Typography } from "@mui/material";
import React from "react";

interface MyComponentProps {
    position: number;
    content: string;
    elo: number;
}

const LeaderboardItem: React.FC<MyComponentProps> = ({position, content, elo}) => {
    return ( 
        <React.Fragment>
            <div className="grid grid-cols-12 items-center rounded-2xl border-2 m-4 p-3 border-blue-400  transition duration-100 ease-in-out hover:bg-blue-400 ">
                <div className="...">
                    <Typography sx={{ typography: { xs:'body1' }}} style={{fontWeight: 500}} className="text-left">#{position}</Typography>
                </div>
                <div className="col-span-10">
                    <Typography sx={{ typography: { xs:'body1' }}} style={{fontWeight: 500}} className="text-center px-4">{content}</Typography>
                </div>
                <div className="...">
                    <Typography sx={{ typography: { xs:'body1' }}} style={{fontWeight: 500}} className="text-right">{elo}</Typography>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default LeaderboardItem;