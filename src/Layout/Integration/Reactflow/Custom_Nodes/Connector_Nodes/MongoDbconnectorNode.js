import React, { useState, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import "../CustomNode.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Image from "next/image";
import { fetchAllData } from "@/app/api/Actions/connectToMongo";

const MongoDbConnectorNode = ({ data, id }) => {
  console.log("data of mongodb node", data);
  const [connections, setConnections] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isMongoSRV, setIsMongoSRV] = useState(false);
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
    setIsMongoSRV(e.target.checked);
    if (!e.target.checked) {
      setFormData({ ...formData, connectionString: "" }); // Reset connection string when unchecked
    }
  };

  const handleSubmit = async () => {
    try {
      let connectionString;

      if (isMongoSRV) {
        if (!formData.connectionString) {
          setConnectionStatus("Connection string is required.");
          return;
        }

        if (!formData.connectionString.startsWith("mongodb+srv://")) {
          setConnectionStatus(
            "Invalid connection string. It must start with 'mongodb+srv://'."
          );
          return;
        }

        connectionString = formData.connectionString;
      } else {
        const { host, port, databaseName, username, password } = formData;

        if (!host || !port || !databaseName) {
          setConnectionStatus("Host, port, and database name are required.");
          return;
        }

        connectionString =
          username && password
            ? `mongodb://${username}:${password}@${host}:${port}/${databaseName}`
            : `mongodb://${host}:${port}/${databaseName}`;

        if (!connectionString.startsWith("mongodb://")) {
          setConnectionStatus(
            "Invalid connection string. It must start with 'mongodb://'."
          );
          return;
        }
      }

      const fetchedData = await fetchAllData(connectionString);
      setConnectionStatus("Connected successfully!");

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
      console.error("Connection failed:", error.message);
      setConnectionStatus("Failed to connect to the database.");
    }
  };

  return (
    <>
      <div className="container">
        <Handle type="target" position={Position.Left} />
        <Tooltip title="MongoDb Connector" placement="top">
          <Image
            src="/assets/mongodb1.png"
            alt="MongoDB"
            width={50}
            height={50}
            onClick={openModal}
            style={{ cursor: "pointer" }}
            loading="eager"
          />
        </Tooltip>

        <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="sm">
          <DialogTitle>MongoDB Credentials</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Host"
              name="host"
              value={formData.host}
              onChange={handleInputChange}
              fullWidth
              disabled={isMongoSRV}
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
              disabled={isMongoSRV}
            />
            <TextField
              margin="dense"
              label="Database Name"
              name="databaseName"
              value={formData.databaseName}
              onChange={handleInputChange}
              fullWidth
              disabled={isMongoSRV}
            />
            <TextField
              margin="dense"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              disabled={isMongoSRV} // Disable when using SRV
            />
            <TextField
              margin="dense"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              disabled={isMongoSRV} // Disable when using SRV
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isMongoSRV}
                  onChange={handleCheckboxChange}
                />
              }
              label="Mongo+SRV"
            />
            {isMongoSRV && (
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
                (isMongoSRV && !formData.connectionString) || // For SRV, check connection string
                (!isMongoSRV &&
                  (!formData.host ||
                    // !formData.port ||
                    // !formData.databaseName ||
                    !formData.username ||
                    !formData.password)) // For non-SRV, check other fields
              }
            >
              Connect
            </Button>
          </DialogActions>
        </Dialog>

        <Handle type="source" position={Position.Right} />
      </div>
      <div className="node-label">MongoDB</div>
    </>
  );
};

export default MongoDbConnectorNode;
