import { Typography } from "@mui/material";
import React from "react";

interface MyComponentProps {
    success: number;
}

const SuccessFailure: React.FC<MyComponentProps> = ({success}) => {
    if (success == 0) { // Failure
        return ( 
            <React.Fragment>
                <Typography sx={{ typography: { xs:'body1' }}} style={{fontWeight: 500}} className="text-center text-red-500 pt-5">Error: Invalid Take. Take length must be greater than 0 characters and less than or equal to 50 characters</Typography>
            </React.Fragment>
        );
    } else if (success == 1) { // Success
        return (
            <React.Fragment>
                 <Typography sx={{ typography: { xs:'body1' }}} style={{fontWeight: 500}} className="text-center text-green-500 pt-5">Success! Take submitted</Typography>
            </React.Fragment>
        )
    } else { // Undefined
        return (<></>);
    }
}
 
export default SuccessFailure;