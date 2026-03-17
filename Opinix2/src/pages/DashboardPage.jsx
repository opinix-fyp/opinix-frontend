import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import TopBar from "../components/layout/TopBar";
import EmptyImportState from "../components/dashboard/EmptyImportState";
import PollWorkspace from "../components/dashboard/PollWorkspace";
import LoadingState from "../components/dashboard/LoadingState";
import { importPoll, analyzePoll } from "../services/api";

import "../css/DashboardPage.css";
//import logo from "../assets/Opinix-Logo.png"; //TODO implement the logo in the dashboard element

function DashboardPage() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [polls, setPolls] = useState([]);
    const [isImporting, setIsImporting] = useState(false);
    const [analysisResults, setAnalysisResults] = useState({});
    const [error, setError] = useState("");

    //to fix the app from crashing when going back to empty state after importing a poll
    const [displayedPoll, setDisplayedPoll] = useState(null);
    const [displayedAnalysis, setDisplayedAnalysis] = useState(null);

    //this is for animations
    const getWorkspaceState = () => {
        if (isImporting) return "loading";
        if (selectedPoll) return "poll";
        return "empty";
    };

    //transition states ohhh yeah
    const [workspaceState, setWorkspaceState] = useState("empty");
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => { //animation useEffect()
        //TODO add a case for when the user switches from one poll to another to play another animation
        const nextState = getWorkspaceState();

        if (nextState !== workspaceState) {
            setIsTransitioning(true);

            setTimeout(() => {
                if (nextState === "poll" && selectedPoll) {
                    setDisplayedPoll(selectedPoll);
                    setDisplayedAnalysis(analysisResults[selectedPoll.id]);
                }

                if (nextState === "empty" || nextState === "loading") {
                    setDisplayedPoll(null);
                    setDisplayedAnalysis(null);
                }

                setWorkspaceState(nextState);
                setIsTransitioning(false);
            }, 250); //250 is the fade out duration. fulcrum. come in, yuuuhhh
        }
    }, [isImporting, selectedPoll, analysisResults]);

        useEffect(() => {
        if (workspaceState === "poll" && selectedPoll) {
            setDisplayedPoll(selectedPoll);
            setDisplayedAnalysis(analysisResults[selectedPoll.id] || null);
        }
    }, [selectedPoll, analysisResults, workspaceState]);
    
    
    useEffect(() => {
        const preventDefault = (event) => {
            event.preventDefault();
        };

        window.addEventListener("dragover", preventDefault);
        window.addEventListener("drop", preventDefault);

        return () => {
            window.removeEventListener("dragover", preventDefault);
            window.removeEventListener("drop", preventDefault);
        }
    }, []); //this just prevents the browser defaulting to opening the file. so we can actually do the chud on the chud.

    const handleImportFile = async (file) => {
        if (!file) return;

        setError("");
        setIsImporting(true);
        setSelectedPoll(null);

        try {
            const importedPoll = await importPoll(file, file.name, "GOOGLE_FORMS");
            const analyzedPoll = await analyzePoll(importedPoll.id);

            setPolls((prevPolls) => [importedPoll, ...prevPolls]);

            setAnalysisResults((prevResults) => ({
                ...prevResults,
                [importedPoll.id]: analyzedPoll,
            }));

            setSelectedPoll(importedPoll);
            
        } catch (err) {
            console.error(err);
            setError(err.message || "An error occurred during import");
        } finally {
            setIsImporting(false);
        }
    };

    const handleSelectPoll = (poll) => {
        setSelectedPoll(poll);
    };

    const handleNewImport = () => {
        setSelectedPoll(null);
        setError("");
    };


    ///* There could be a problem with this... if we are just saving the one poll in displayedpoll, if we switch to another poll, we might be showing the results of the previous poll instead of the current one... idk we shall see. */
    //TODO probably read the contents of the poll + sentiment from db instead of locally saving it.. that way we can tie each to a user's account, so they dont have to login with none imports
    return (
        <div className="dashboard-page">
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                polls={polls} 
                onSelectPoll={handleSelectPoll}
                onNewImport={handleNewImport}
            />

            <div className="dashboard-main">
                <TopBar selectedPoll={selectedPoll} />

                <div className={`dashboard-workspace ${isTransitioning ? "fade-out" : ""}`}>

                    {workspaceState === "loading" && (
                        <div className= "workspace fade-in">
                            <LoadingState />
                        </div>
                    )}

                    {workspaceState === "poll" && displayedPoll && (
                        <div className= "workspace slide-fade-in">
                            <PollWorkspace 
                                selectedPoll={displayedPoll}
                                analysisResult={displayedAnalysis}
                            />
                        </div>
                    )}

                    {workspaceState === "empty" && (
                        <div className= "workspace fade-in">
                            <EmptyImportState onImportFile={handleImportFile} error={error} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;