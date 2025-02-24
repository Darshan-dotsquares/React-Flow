import React, { useState } from "react";
import { useSession } from "next-auth/react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";

const initialFolders = [
  {
    id: "company-folder",
    name: "pajikoc548@sectorid.com",
    type: "folder",
    children: [
      {
        id: "processes",
        name: "Processes",
        type: "folder",
        children: [
          {
            id: "hello-world",
            name: "Hello World",
            type: "file",
          },
        ],
      },
    ],
  },
];

function ComponentsPanel() {
  const {data : session} = useSession();
  const [expandedFolders, setExpandedFolders] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuItemId, setMenuItemId] = useState(null);

  // useEffect(() => {
  //   if (session?.user?.companyName) {
      // axios
      //   .get(`/api/folders?company=${session.user.companyName}`)
      //   .then((res) => setFolders(res.data))
      //   .catch((err) => console.error("Error fetching folders:", err));


  //   }
  // }, [session]);

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const handleMenuOpen = (event, itemId) => {
    setMenuAnchor(event.currentTarget);
    setMenuItemId(itemId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuItemId(null);
  };

  const renderFolders = (folders) => {
    return folders.map((item) => (
      <div key={item.id} style={{ paddingLeft: "10px", marginBottom: "5px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "4px",
            borderRadius: "4px",
            backgroundColor:
              hoveredItem === item.id ? "#f0f7ff" : "transparent",
          }}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {item.type === "folder" && (
            <span onClick={() => toggleFolder(item.id)}>
              {expandedFolders[item.id] ? (
                <KeyboardArrowDownIcon fontSize="small" />
              ) : (
                <KeyboardArrowRightIcon fontSize="small" />
              )}
            </span>
          )}
          {item.type === "folder" ? (
            <FolderIcon
              fontSize="small"
              style={{ marginRight: "8px", color: "#072b55" }}
            />
          ) : (
            <InsertDriveFileIcon
              fontSize="small"
              style={{ marginRight: "8px", color: "#6d6d6d" }}
            />
          )}
          <span
            style={{
              color: "#1f1f1f",
              font: "14px sans-serif",
              cursor: "default",
            }}
          >
            {item.name}
          </span>

          {item.type === "folder" && (
            <div
              style={{
                marginLeft: "auto",
                visibility: hoveredItem === item.id ? "visible" : "hidden",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MoreVertIcon
                fontSize="small"
                style={{ cursor: "pointer" }}
                onClick={(event) => handleMenuOpen(event, item.id)}
              />
            </div>
          )}
        </div>

        {expandedFolders[item.id] && item.children && (
          <div style={{ marginLeft: "15px" }}>
            {renderFolders(item.children)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div style={{ borderRight: "1px solid #ddd", padding: "10px" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #0078D4",
            borderRadius: "20px",
            padding: "4px 8px",
            flex: 1,
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          <span style={{ marginRight: "8px", color: "#888" }}>
            <SearchIcon />
          </span>
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

      {renderFolders(initialFolders)}

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => console.log("New Component")}>
          New Component
        </MenuItem>
        <MenuItem onClick={() => console.log("New Folder")}>
          New Folder
        </MenuItem>
        <MenuItem onClick={() => console.log("Rename")}>Rename</MenuItem>    
        <MenuItem onClick={() => console.log("Permissions")}>
          Permissions
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ComponentsPanel;
