import React, { useState, useEffect, useRef } from "react";
import { Button, Box } from "@mui/material";
import { signOut } from "next-auth/react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import "./PrimaryNavbar.css";

// import Image from "next/image";

function Navbar() {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [labDropdownOpen, setLabDropdownOpen] = useState(false);
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (dropdown) => {
    if (dropdown === "services") {
      setServicesDropdownOpen(!servicesDropdownOpen);
      setResourcesDropdownOpen(false);
      setLabDropdownOpen(false);
      setSettingsDropdownOpen(false);
    } else if (dropdown === "resources") {
      setResourcesDropdownOpen(!resourcesDropdownOpen);
      setServicesDropdownOpen(false);
      setLabDropdownOpen(false);
      setSettingsDropdownOpen(false);
    } else if (dropdown === "lab") {
      setLabDropdownOpen(!labDropdownOpen);
      setServicesDropdownOpen(false);
      setResourcesDropdownOpen(false);
      setSettingsDropdownOpen(false);
    } else if (dropdown === "settings") {
      setSettingsDropdownOpen(!settingsDropdownOpen);
      setServicesDropdownOpen(false);
      setResourcesDropdownOpen(false);
      setLabDropdownOpen(false);
    }
  };

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/login", // Redirect to login page after sign-out
    });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setServicesDropdownOpen(false);
      setResourcesDropdownOpen(false);
      setLabDropdownOpen(false);
      setSettingsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#002855",
    color: "white",
    padding: "1px 20px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  };

  const leftNavStyle = {
    display: "flex",
    alignItems: "center",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "30px",
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
    position: "relative",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "40px",
    left: "0",
    backgroundColor: "white",
    color: "#002855",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    zIndex: 10,
    display: "block",
    width: "300px",
    padding: "10px 0",
  };

  const dropdownItemStyle = {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const dropdownItemHoverStyle = {
    backgroundColor: "#f5f5f5",
  };

  const navLinkItemStyle = {
    cursor: "pointer",
    fontWeight: "500",
    transition: "color 0.3s",
    position: "relative",
    zIndex: 101,
  };

  const rightNavStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  return (
    <nav style={navbarStyle} ref={dropdownRef}>
      {/* Left Side - Logo and Links */}
      <div style={leftNavStyle}>
        <div
          style={{ fontSize: "26px", fontWeight: "bold", cursor: "pointer" }}
        >
          {/* <Image
            src="/assets/redcolor.png"
            alt="React Flow"
            width={35} 
            height={35} 
            style={{
              objectFit: "contain",
              marginRight: "50px",
            }}
          /> */}

          <h3 style={{ marginRight: "50px" }}>Reactflow</h3>
        </div>
        <ul style={navLinksStyle}>
          {/* Services Dropdown */}
          <li
            style={navLinkItemStyle}
            onClick={() => toggleDropdown("services")}
            className="nav-link"
          >
            {servicesDropdownOpen ? "Services ▴" : "Services ▾"}

            {servicesDropdownOpen && (
              <div style={dropdownStyle}>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Integration</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Build processes that transform and integrate data between
                    systems.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>DataHub</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Synchronize, cleanse, match, and enrich trusted data across
                    domains.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>API Management</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Manage and control the usage of APIs throughout their
                    lifecycle.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Flow</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Automate sophisticated workflows to create customer
                    journeys.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Event Stream</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Create, manage, and publish message queues and streams.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Task Automation</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Optimize respective tasks with no code.
                  </span>
                </div>
              </div>
            )}
          </li>

          {/* Resources Dropdown */}
          <li
            style={navLinkItemStyle}
            onClick={() => toggleDropdown("resources")}
            className="nav-link"
          >
            {resourcesDropdownOpen ? "Resources ▴" : "Resources ▾"}

            {resourcesDropdownOpen && (
              <div style={dropdownStyle}>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Help Documentation</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Read official guides and user manuals.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Developer Resources</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Access SDKs, tutorials, and API references.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Support</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Contact our support team for help.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Community</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Ask questions, share knowledge, and join groups with other
                    users.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Training</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Develop core competencies as part of the Boomi certification
                    path.
                  </span>
                </div>
              </div>
            )}
          </li>

          {/* Labs Dropdown */}
          <li style={navLinkItemStyle} 
            onClick={() => toggleDropdown("lab")}
            className="nav-link"
          >

            {labDropdownOpen ? "Labs ▴" : "Labs ▾"}

            {labDropdownOpen && (
              <div style={dropdownStyle}>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Help Documentation</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Read official guides and user manuals.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Developer Resources</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Access SDKs, tutorials, and API references.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Support</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Contact our support team for help.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Community</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Ask questions, share knowledge, and join groups with other
                    users.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Training</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Develop core competencies as part of the Boomi certification
                    path.
                  </span>
                </div>
              </div>
            )}
          </li>

          {/* Settings Dropdown */}
          <li
            style={navLinkItemStyle}
            onClick={() => toggleDropdown("settings")}
            className="nav-link"
          >

            {settingsDropdownOpen ? "Settings ▴" : "Settings ▾"}

            {settingsDropdownOpen && (
              <div style={dropdownStyle}>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Profile Settings</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Manage your personal account settings.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Preferences</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Customize your application preferences.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  <strong>Notification Settings</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Configure your notification preferences.
                  </span>
                </div>
                <div
                  style={dropdownItemStyle}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor =
                      dropdownItemHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                  onClick={handleSignOut}
                >
                  <strong>Sign Out</strong>
                  <br />
                  <span style={{ fontSize: "15px", color: "#555" }}>
                    Log out of your account securely.
                  </span>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Right Side - Icons and Buttons */}
      <Box style={rightNavStyle}>
        <AccountCircleIcon style={{ fontSize: "28px", cursor: "pointer" }} />
        <HelpOutlineIcon style={{ fontSize: "28px", cursor: "pointer" }} />
        <MailOutlineIcon style={{ fontSize: "28px", cursor: "pointer" }} />
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          style={{
            color: "white",
            borderColor: "white",
            textTransform: "none",
            fontSize: "12px",
            padding: "5px 10px",
            margin: "10px 0px"
          }}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Box>
    </nav>
  );
}

export default Navbar;
