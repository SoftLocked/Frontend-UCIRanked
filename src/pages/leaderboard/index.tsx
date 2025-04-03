import { logEvent } from "firebase/analytics";
import { analytics } from "../../lib/firebase";
import { useEffect } from "react";

const Leaderboard = () => {

    useEffect(() => {
        if (analytics) {
            logEvent(analytics, "page_view", { page_path: '/leaderboard' });
        }
    }, []);

    return ( <h1>Coming Soon...</h1> );
}
 
export default Leaderboard;