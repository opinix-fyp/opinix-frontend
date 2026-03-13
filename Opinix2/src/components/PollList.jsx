import { useEffect, useState } from "react";
import { getPolls } from "../services/api";

function PollList(){
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        async function loadPolls() {
            const data = await getPolls();
            setPolls(data);
        }

        loadPolls();
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div>
            {polls.map(poll => (
                <button key={poll.id}>{poll.title}</button>
            ))}
        </div>
    )
}

export default PollList;