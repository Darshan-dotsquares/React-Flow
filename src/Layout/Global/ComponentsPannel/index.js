import React, { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FolderIcon from '@mui/icons-material/Folder';

function ComponentsPanel() {
  const [companyNames, setCompanyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch company names from the API
    const fetchCompanyNames = async () => {
      // try {
      //   const response = await fetch('/api/componentsbar');
      //   if (!response.ok) {
      //     const errorDetails = await response.text();
      //     throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}. Details: ${errorDetails}`);
      //   }
      //   const data = await response.json();
      //   setCompanyNames([...new Set(data)]); // Ensure unique company names
      // } catch (error) {
      //   console.error('Error fetching company names:', error);
      // } finally {
      //   setLoading(false);
      // }
    };

    fetchCompanyNames();
  }, []);

  return (
    <div 
      style={{
        borderRight: "1px solid #ddd", 
        padding: "10px",
      }}>
      
      {/* Container for Search Input and Filter Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        {/* Search Input Panel */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #0078D4",
            borderRadius: "20px",
            padding: "4px 8px",
            flex: 1, // Take remaining space
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Search Icon */}
          <span
            style={{
              marginRight: "8px",
              color: "#888",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchIcon />
          </span>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search component"
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: "14px",
              color: "#333",
            }}
          />
        </div>

        {/* Filter Button */}
        <span
          style={{
            marginLeft: "10px",
            color: "#0078D4",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            border: "1px solid #0078D4",
            borderRadius: "50%",
            padding: "8px",
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          <FilterListIcon />
        </span>
      </div>

      {/* Folder Structure */}
      <div>
        {loading ? (
          <p>Loading company names...</p>
        ) : (
          companyNames.length > 0 ? (
            <ul>
              {companyNames.map((company, index) => (
                <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px", fontSize: "30px" }}>
                  <FolderIcon style={{ marginRight: "8px", color: "#0078D4" }} />
                  {company}
                </li>
              ))}
            </ul>
          ) : (
            <p>No company names found</p>
          )
        )}
      </div>
    </div>
  );
}

export default ComponentsPanel;