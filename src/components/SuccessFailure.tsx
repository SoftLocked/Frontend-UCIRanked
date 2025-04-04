import { Typography } from "@mui/material";
import React from "react";

interface MyComponentProps {
    success: number;
}

const SuccessFailure: React.FC<MyComponentProps> = ({success}) => {
    if (success == 0) { // Failure
        return ( 
            <React.Fragment>
                <Typography sx={{ typography: { xs:'body1' }}} style={{fontWeight: 500}} className="text-left text-red-500 pt-5"><u>Error: Invalid Take.</u><br/>Take must be unique<br/>Take must have greater than 0 characters<br/>Take must have less than or equal to 50 characters<br/>Must be at least 10 seconds since previous submission</Typography>
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