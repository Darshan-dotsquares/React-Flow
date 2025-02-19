import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Grid,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import Image from "next/image";
import { Remove } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { crudOperations, fetchSchema } from "@/app/api/Actions/connectToMongo";
import { FlowContext } from "@/context/FlowContext";
import {
  fetchTableStructure,
  sqlCrudOperations,
} from "@/app/api/Actions/connectToSql";

const DatabaseOperationsNode = ({ id, data }) => {
  const { getNodes } = useReactFlow();
  const { isFlowStarted } = useContext(FlowContext);
  const [open, setOpen] = useState(false);
  const [operation, setOperation] = useState("create");
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [availableDatabases, setAvailableDatabases] = useState([]);
  const [availableCollections, setAvailableCollections] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [readData, setReadData] = useState(null);
  const [childDialogOpen, setChildDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false); // State to track copy status
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  useEffect(() => {
    if (isFlowStarted) {
      const nodes = getNodes();
      const databases = nodes
        .filter((node) => node.data.connectionString)
        .map((node) => ({
          id: node.id,
          type: node.type,
          connectionString: node.data.connectionString,
          collections: node.data.collections || [],
        }));

      setAvailableDatabases(databases);
    }
  }, [getNodes, isFlowStarted]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setShowAdditionalFields(false);
  };

  const handleOperationChange = async (event) => {
    const newOperation = event.target.value;
    setOperation(newOperation);
    setShowAdditionalFields(false);
    setSubmitStatus({ success: false, message: "" });
    await updateFormFields(newOperation);
  };

  const updateFormFields = async (operation) => {
    if (!selectedDatabase || !selectedCollection) return;

    const selectedDB = availableDatabases.find(
      (db) => db.id === selectedDatabase
    );
    if (!selectedDB) return;

    try {
      let fields = [];

      if (selectedDB.type === "MongoDbConnectorNode") {
        //fetching schema for MongoDb
        const schema = await fetchSchema(
          selectedDB.connectionString,
          selectedCollection
        );

        fields = schema.map((field) => ({
          label: field.name,
          type: field.type === "number" ? "number" : "text",
          name: field.name,
          value: "",
        }));
      } else if (selectedDB.type === "SqlDbConnectorNode") {
        // Fetch table structure for SQL
        const tableStructure = await fetchTableStructure(
          selectedDB.connectionString,
          selectedCollection // Assuming this is the table name for SQL
        );

        console.log("tableStructure", tableStructure);

        fields = tableStructure.map((column) => ({
          label: column.name,
          type: column.type === "number" ? "number" : "text",
          name: column.name,
          value: "",
        }));
        // console.log("fieldsSQL table", tableStructure);

      }

      // Adjust fields based on operation type
      switch (operation) {
        case "create":
          fields = fields.filter((field) =>
            selectedDB.type === "MongoDbConnectorNode"
              ? field.name !== "_id"
              : field.name !== "id"
          );
          break;
        case "read":
          fields = [];
          break;
        case "update":
         const idFields = selectedDB.type === "MongoDbConnectorNode"
          ? { label: "_id", type: "text", name: "_id", value: "" }
          : { label: "id", type: "text", name: "id", value: "" };
          fields = [idFields];
          break;
        case "delete":
          const idField =
            selectedDB.type === "MongoDbConnectorNode"
              ? { label: "_id", type: "text", name: "_id", value: "" }
              : { label: "id", type: "text", name: "id", value: "" };
          fields = [idField];
          break;
        default:
          fields = [];
      }
      setFormFields(fields);
    } catch (error) {
      console.error("Error fetching schema/table structure:", error);
      setFormFields([]);
    }
  };

  const handleDatabaseChange = (event) => {
    const dbId = event.target.value;
    setSelectedDatabase(dbId);
    const selectedDB = availableDatabases.find((db) => db.id === dbId);
    setAvailableCollections(selectedDB ? selectedDB.collections : []);
  };

  const handleCollectionChange = (event) => {
    setSelectedCollection(event.target.value);
  };

  const handleFieldChange = (index, event) => {
    const updatedFields = [...formFields];
    updatedFields[index].value = event.target.value;
    setFormFields(updatedFields);
  };

  const handleLabelChange = (index, event) => {
    const updatedFields = [...formFields];
    updatedFields[index].label = event.target.value;
    setFormFields(updatedFields);
  };

  const handleCopy = () => {
    if (readData) {
      navigator.clipboard.writeText(JSON.stringify(readData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  };

  // const handleAddField = () => {
  //   setFormFields([
  //     ...formFields,
  //     { label: "", type: "text", name: `field${formFields.length}`, value: "" },
  //   ]);
  // };

  // const handleRemoveField = (index) => {
  //   const updatedFields = formFields.filter((_, i) => i !== index);
  //   setFormFields(updatedFields);
  // };

  const checkIdExists = async () => {
    if (!selectedDatabase || !selectedCollection) {
      setSubmitStatus({
        success: false,
        message: "Please select a database and collection.",
      });
      return;
    }
  
    const selectedDB = availableDatabases.find(
      (db) => db.id === selectedDatabase
    );

    if (!selectedDB) {
      setSubmitStatus({
        success: false,
        message: "Selected database not found.",
      });
      return;
    }
  
    // Find the ID field (_id for MongoDB, id for SQL)
    const idField = formFields.find(
      (field) => field.name === "_id" || field.name === "id"
    );
    if (!idField || !idField.value) {
      setSubmitStatus({
        success: false,
        message: "ID field is missing or empty.",
      });
      return;
    }
  
    try {
      let result;
      if (selectedDB.type === "MongoDbConnectorNode") {
        // MongoDB: Use _id
        result = await crudOperations(
          "read",
          selectedDB.connectionString,
          selectedCollection,
          { _id: idField.value }
        );
      } else if (selectedDB.type === "SqlDbConnectorNode") {
        // SQL: Use id
        result = await sqlCrudOperations(
          "read",
          selectedDB.connectionString,
          selectedCollection,
          { id: idField.value }
        );
        console.log("idField.value here", (idField.value));
      } else {
        throw new Error("Unsupported database type.");
      }
  
      if (result.length > 0) {
        const document = result[0];
  
        // Fetch schema only for MongoDB (SQL schema is already known)
        let fields;
        if (selectedDB.type === "MongoDbConnectorNode") {
        const schema = await fetchSchema(
            selectedDB.connectionString,
            selectedCollection
          );
          fields = schema.map((field) => ({
            label: field.name,
            type: field.type === "number" ? "number" : "text",
            name: field.name,
            value: document[field.name] || "",
          }));
        } else {
          // For SQL, use the table structure
          const tableStructure = await fetchTableStructure(
            selectedDB.connectionString,
            selectedCollection
          );
          fields = tableStructure.map((column) => ({
            label: column.name,
            type: column.type,
            name: column.name,
            value: document[column.name] || "",
          }));
        }
  
        setFormFields(fields);
        setSubmitStatus({
          success: true,
          message: "Successfully fetched the data.",
        });
        setShowAdditionalFields(true);
      } else {
        setSubmitStatus({
          success: false,
          message: "Document with the provided ID does not exist.",
        });
      }
    } catch (error) {
      console.error("Error checking ID:", error);
      setSubmitStatus({
        success: false,
        message: `Error checking ID: ${error.message}`,
      });
    }
  };

  const handleSubmit = async () => {
    if (!selectedDatabase || !selectedCollection) {
      setSubmitStatus({
        success: false,
        message: "Please select a database and collection.",
      });
      return;
    }

    //opening the confirmation dialog box
    setConfirmationOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setConfirmationOpen(false);

    const selectedDB = availableDatabases.find(
      (db) => db.id === selectedDatabase
    );
    console.log("Selected Db in confirm Submit", selectedDB);
    if (!selectedDB) return;

    const formData = formFields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {});

    try {
      let result;
      if (selectedDB.type === "MongoDbConnectorNode") {
        result = await crudOperations(
          operation,
          selectedDB.connectionString,
          selectedCollection,
          formData
        );
        console.log("MongoDb result:", result); // Log here

      } else if (selectedDB.type === "SqlDbConnectorNode") {
        result = await sqlCrudOperations(
          operation,
          selectedDB.connectionString,
          selectedCollection, // Assuming this is the table name for SQL
          formData
        );
        console.log("SQL Db result:", result);
      }

      if (operation === "read") {
        setReadData(result);
      }

      setSubmitStatus({
        success: true,
        message: "Operation succeeded!",
      });
    } catch (error) {
      console.error("CRUD Operation Error:", error);

      setSubmitStatus({
        success: false,
        message: (
          <div>
          <strong>Operation failed:</strong>
          <div>{error.message}</div>
        </div>
        ),
      });
    }
  };

  return (
    <>
      <div className="container">
        <Handle type="target" position={Position.Left} />
        <Tooltip title="Database Operations" placement="top">
          <Image
            src="/assets/databaseoperations.png"
            alt="Data Action"
            width={50}
            height={50}
            onClick={handleOpen}
            style={{ cursor: "pointer" }}
            loading="eager"
          />
        </Tooltip>
        <Handle type="source" position={Position.Right} />
      </div>

      <div className="node-label">Database Operations</div>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>CRUD Operations</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="connected-database-label">
                Connected Database
              </InputLabel>
              <Select
                labelId="connected-database-label"
                value={selectedDatabase}
                onChange={handleDatabaseChange}
                label="Connected Database"
              >
                {availableDatabases.map((db) => (
                  <MenuItem key={db.id} value={db.id}>
                    {db.type} - {db.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedDatabase && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="collection-table-label">
                  Collection/Table
                </InputLabel>
                <Select
                  labelId="collection-table-label"
                  value={selectedCollection}
                  onChange={handleCollectionChange}
                  label="Collection/Table"
                >
                  {availableCollections.map((collection) => (
                    <MenuItem key={collection} value={collection}>
                      {collection}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <FormControl fullWidth margin="normal">
              <InputLabel id="operation-label">Operation</InputLabel>
              <Select
                labelId="operation-label"
                value={operation}
                onChange={handleOperationChange}
                label="Operation"
              >
                <MenuItem value="create">Create</MenuItem>
                <MenuItem value="read">Read</MenuItem>
                <MenuItem value="update">Update</MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
              </Select>
            </FormControl>

            {formFields.map((field, index) => (
              <Grid container spacing={2} alignItems="center" key={index}>
                <Grid item xs={4}>
                  <TextField
                    // label="Field Label"
                    name={`label-${index}`}
                    fullWidth
                    margin="normal"
                    value={field.label}
                    onChange={(e) => handleLabelChange(index, e)}
                    required
                    sx={{ mr: 1 }}
                    variant="filled"
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label={field.label || "Field Value"}
                    name={field.name}
                    fullWidth
                    margin="normal"
                    value={field.value}
                    onChange={(e) => handleFieldChange(index, e)}
                    required
                    sx={{ mr: 1 }}
                  />
                </Grid>

                <Grid item xs={2}>
                  {(field.name === "_id" || field.name === "id") && operation === "update" && (
                    <Button
                      variant="contained"
                      onClick={checkIdExists}
                      sx={{ ml: 1 }}
                    >
                      Check
                    </Button>
                  )}
                </Grid>

                {/* <IconButton
                  onClick={() => handleRemoveField(index)}
                  color="error"
                  sx={{ ml: 1 }}
                >
                  <Remove />
                </IconButton> */}
              </Grid>
            ))}

            {/* {showAdditionalFields && (
              <Button
                variant="outlined"
                onClick={handleAddField}
                sx={{ mt: 2, mb: 2 }}
              >
                Add New Field
              </Button>
            )} */}

            {submitStatus.message && (
              <Alert
                severity={submitStatus.success ? "success" : "error"}
                sx={{ mt: 2 }}
              >
                {submitStatus.message}
              </Alert>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          {operation === "read" && readData && (
            <Tooltip title="View JSON Data" placement="top">
              <IconButton onClick={() => setChildDialogOpen(true)}>
                <Image
                  src="/assets/json-icon.png"
                  alt="View Data"
                  width={30}
                  height={30}
                />
              </IconButton>
            </Tooltip>
          )}

          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/*Json Data showing dialog box*/}
      <Dialog
        open={childDialogOpen}
        onClose={() => setChildDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <span>Fetched Data</span>
            <Tooltip title="Copy" placement="top">
              <IconButton onClick={handleCopy}>
                {copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </DialogTitle>

        <DialogContent>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              background: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {JSON.stringify(readData, null, 2)}
          </pre>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setChildDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Operation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to perform {operation} operation?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSubmit}
            color="primary"
            variant="contained"
          >
            Yes, Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DatabaseOperationsNode;
