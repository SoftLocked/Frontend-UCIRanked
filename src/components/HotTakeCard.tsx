import { Typography } from "@mui/material";

const HotTakeCard = (props:any) => {
    const {take} = props;
    return ( 
        <div className="w-full h-full border-2 cursor-pointer border-blue-400 rounded-2xl p-10 transition duration-500 ease-in-out hover:bg-blue-400">
            <Typography sx={{ typography: { xs:'h5', md:'h6', lg:'h3' } }} style={{fontWeight: 700}} className="pb-[20px]">{take}</Typography>
        </div>
     );
}
 
export default HotTakeCard;