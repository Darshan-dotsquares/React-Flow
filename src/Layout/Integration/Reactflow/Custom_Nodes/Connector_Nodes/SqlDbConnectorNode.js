import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import Image from "next/image";
import { fetchAllData } from "@/app/api/Actions/connectToSql";

const SqlDbConnectorNode = ({ data, id }) => {
  console.log("data of SQL node", data);
  const [isOpen, setIsOpen] = useState(false);
  const [isSqlSRV, setIsSqlSRV] = useState(false);
  const { setNodes } = useReactFlow();
  const [formData, setFormData] = useState({
    host: "",
    port: "",
    databaseName: "",
    username: "",
    password: "",
    connectionString: "",
  });
  const [connectionStatus, setConnectionStatus] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setConnectionStatus("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setIsSqlSRV(e.target.checked);
    if (!e.target.checked) {
      setFormData({ ...formData, connectionString: "" }); // Reset connection string when unchecked
    }
  };

  const handleSubmit = async () => {
    try {
      let connectionString;

      if (isSqlSRV) {
        if (!formData.connectionString) {
          setConnectionStatus("Connection string is required.");
          return;
        }

        if (!formData.connectionString.startsWith("mysql://")) {
          setConnectionStatus(
            "Invalid connection string. It must start with 'mysql://'."
          );
          return;
        }

        connectionString = formData.connectionString;
      } else {
        const { host, port, databaseName, username, password } = formData;

        if (!host || !port || !databaseName || !username) {
          setConnectionStatus(
            "All fields (host, port, database name, username, and password) are required."
          );
          return;
        }

        connectionString = `mysql://${username}:${password}@${host}:${port}/${databaseName}`;
      }

      // console.log("Connection string:", connectionString);

      const fetchedData = await fetchAllData(connectionString);
      setConnectionStatus("Connected successfully!");

      // console.log("fetchedData", fetchedData);

      setNodes((nds) =>
        nds.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  inputValues: formData,
                  outputData: fetchedData,
                  connectionString,
                  collections: Object.keys(fetchedData),
                },
              }
            : node
        )
      );
      setIsOpen(false);
    } catch (error) {
      console.log("Connection failed:", error.message);
      setConnectionStatus("Failed to connect to the database.");
    }
  };

  return (
    <>
      <div className="container">
        <Handle type="target" position={Position.Left} />
        <Tooltip title="SQL Connector" placement="top">
          <Image
            src="/assets/sql.png"
            alt="SqlDb"
            width={50}
            height={50}
            onClick={openModal}
            style={{ cursor: "pointer" }}
            loading="eager"
            quality={100}
          />
        </Tooltip>

        <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="sm">
          <DialogTitle>Sql Database Credentials</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Host"
              name="host"
              value={formData.host}
              onChange={handleInputChange}
              fullWidth
              disabled={isSqlSRV}
            />
            <TextField
              margin="dense"
              label="Port"
              name="port"
              value={formData.port}
              onChange={handleInputChange}
              fullWidth
              type="number"
              inputProps={{ min: 0, step: 0.5 }}
              disabled={isSqlSRV}
            />
            <TextField
              margin="dense"
              label="Database Name"
              name="databaseName"
              value={formData.databaseName}
              onChange={handleInputChange}
              fullWidth
              disabled={isSqlSRV}
            />
            <TextField
              margin="dense"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              disabled={isSqlSRV} // Disable when using SRV
            />
            <TextField
              margin="dense"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              disabled={isSqlSRV} // Disable when using SRV
            />
            <FormControlLabel
              control={
                <Checkbox checked={isSqlSRV} onChange={handleCheckboxChange} />
              }
              label="Sql Url"
            />
            {isSqlSRV && (
              <TextField
                margin="dense"
                label="Connection String"
                name="connectionString"
                value={formData.connectionString}
                onChange={handleInputChange}
                fullWidth
              />
            )}
            {connectionStatus && (
              <p
                style={{
                  color:
                    connectionStatus.includes("Invalid") ||
                    connectionStatus.includes("Failed")
                      ? "red"
                      : "green",
                }}
              >
                {connectionStatus}
              </p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={
                (isSqlSRV && !formData.connectionString) || // For SRV, check connection string
                (!isSqlSRV &&
                  (!formData.host ||
                    !formData.port ||
                    !formData.databaseName ||
                    !formData.username))
              }
            >
              Connect
            </Button>
          </DialogActions>
        </Dialog>

        <Handle type="source" position={Position.Right} />
      </div>
      <div className="node-label">SQL DB</div>
    </>
  );
};

export default SqlDbConnectorNode;
