import "../../css/Sidebar.css";

function Sidebar({ collapsed, onToggle, polls, onSelectPoll, onNewImport }) {
    return (
        <aside className={'sidebar' + (collapsed ? ' collapsed' : '')}>
            <div className="sidebar-top">
                {!collapsed && <h2 className="sidebar-logo">Opinix</h2>}

                <button className="sidebar-toggle" onClick={onToggle}>
                    {collapsed ? '>' : '<'}
                </button>
            </div>

            <div className="sidebar-actions">
                <button className="new-import-button" onClick={onNewImport}>
                    {collapsed ? '+' : 'New Import'}
                </button>
            </div>

            <div className="sidebar-polls">
                {!collapsed && <p className="sidebar-section-title">Imported Polls</p>}

                {polls.length === 0 ? (
                    !collapsed && <p className="sidebar-empty">No polls imported yet</p>
                ) : (
                    polls.map((poll) => (
                        <button
                            key={poll.id}
                            className="sidebar-poll-item"
                            onClick={() => onSelectPoll(poll)}
                        >
                            {collapsed ? poll.title[0] : poll.title}
                        </button>
                    ))
                )}
            </div>
        </aside>
    );
}

export default Sidebar;