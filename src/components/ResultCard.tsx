import React from "react";

const ResultCard = (props: any) => {

    let {position, winner} = props;

    if (winner != "tie") {
        winner = winner == position
    }

    switch (winner) {
        case "tie":
            return (
                <div className="w-full h-full bg-gray-200 rounded-2xl">

                </div>
            );
        case true:
            return (
                <div className="w-full h-full bg-green-200 rounded-2xl">

                </div>
            );
        case false:
            return (
                <div className="w-full h-full bg-red-200 rounded-2xl">

                </div>
            );
    }

}

export default ResultCard;