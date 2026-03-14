import "../../css/TopBar.css";

function TopBar({ selectedPoll }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">
          {selectedPoll ? selectedPoll.title : "Home"}
        </h1>
      </div>

      <div className="topbar-right">
        <div className="profile-icon">P</div>
      </div>
    </header>
  );
}

export default TopBar;