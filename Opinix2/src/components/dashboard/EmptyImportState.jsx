import { useRef, useState } from "react";

import logo from "../../assets/Opinix-Logo.png";
import "../../css/DashboardPage.css";

function EmptyImportState({ onImportFile, error }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onImportFile(file);

    //to accept only csv files
    if (file && !file.name.toLowerCase().endswith(".csv")) {
      return;
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      onImportFile(file);
    }
    
    //to accept only csv files same as above
    if (file && !file.name.toLowerCase().endsWith(".csv")) {
      return;
    }
  };

  return (
    <div 
      className={`empty-import-state ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >

      {/* <div className="empty-import-logo">Opinix</div> */}

      <img src = {logo} alt = "Opinix Logo" className="empty-import-logo-img"/>

      <p className="empty-import-text">No poll selected.</p>

      <button className="empty-import-button" onClick={handleButtonClick}>
        Import CSV
      </button>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <p className="empty-import-subtext">
        Or drag in a CSV file here to import.
      </p>

      {error && <p className="empty-import-error">{error}</p>}
    </div>
  );
}

export default EmptyImportState;