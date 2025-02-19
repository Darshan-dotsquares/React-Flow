import React, { useState, useEffect, useContext } from "react";
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
  Slider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import Image from "next/image";
import { FlowContext } from "@/context/FlowContext";

const DataActionNode = ({ id, data }) => {
  // console.log("data of dataAction Node", data);
  const [open, setOpen] = useState(false);
  const [field, setField] = useState("");
  const [operator, setOperator] = useState("");
  const [value, setValue] = useState("");
  const [range, setRange] = useState([0, 100]);
  const [sorting, setSorting] = useState("");
  const [connectedData, setConnectedData] = useState([]);
  const [fields, setFields] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");

  // New state for table visibility and filtered data
  const [filteredData, setFilteredData] = useState([]);
  const [isChildModalOpen, setIsChildModalOpen] = useState(false);

  // Context and hooks
  const { getEdges, getNode, setNodes } = useReactFlow();
  const { isFlowStarted } = useContext(FlowContext);

  // Effect hook to fetch data and set fields
  // useEffect(() => {
  //   if (!isFlowStarted) {
  //     console.log("Flow is not started. DataActionNode is inactive.");
  //     return;
  //   }

  //   const connectedEdges = getEdges().filter((edge) => edge.target === id);
  //   if (connectedEdges.length === 0) {
  //     console.log("DataActionNode is not connected to any node.");
  //     return;
  //   }

  //   const newConnectedData = connectedEdges
  //     .map((edge) => {
  //       const sourceNode = getNode(edge.source);
  //       return sourceNode ? sourceNode.data.outputData : null;
  //     })
  //     .filter(Boolean);

  //   if (newConnectedData.length > 0) {
  //     setConnectedData(newConnectedData);

  //     const tableNames = Object.keys(newConnectedData[0] || {});

  //     setTables(tableNames);

  //     if (tableNames.length > 0) {
  //       setSelectedTable(tableNames[0]); // Default to the first table

  //       setFields(Object.keys(newConnectedData[0][tableNames[0]][0] || {}));
  //     }
  //   }
  // }, [getEdges, getNode, id, isFlowStarted]);

  useEffect(() => {
    if (!isFlowStarted) {
      console.log("Flow is not started. DataActionNode is inactive.");
      return;
    }
  
    const fetchData = () => {
      const connectedEdges = getEdges().filter((edge) => edge.target === id);
      if (connectedEdges.length === 0) {
        console.log("DataActionNode is not connected to any node.");
        return;
      }
  
      const newConnectedData = connectedEdges
        .map((edge) => {
          const sourceNode = getNode(edge.source);
          return sourceNode ? sourceNode.data.outputData : null;
        })
        .filter(Boolean);
  
      if (newConnectedData.length > 0) {
        setConnectedData(newConnectedData);
  
        const tableNames = Object.keys(newConnectedData[0] || {});
        setTables(tableNames);
  
        if (tableNames.length > 0) {
          setSelectedTable((prev) =>
            tableNames.includes(prev) ? prev : tableNames[0]
          ); // Preserve current table if still available, otherwise default to the first table
          setFields(Object.keys(newConnectedData[0][tableNames[0]][0] || {}));
        }
      }
    };
  
    // Initial fetch
    fetchData();
  
    // Set up an interval for periodic updates
    // const intervalId = setInterval(() => {
    //   // console.log("Fetching updated data...");
    //   fetchData();
    // }, 5000); // Fetch every 5 seconds
  
    // // Cleanup interval on unmount
    // return () => clearInterval(intervalId);
  }, [getEdges, getNode, id, isFlowStarted]);
  

  const handleTableChange = (event) => {
    const selected = event.target.value;

    setSelectedTable(selected);

    setFields(Object.keys(connectedData[0][selected][0] || {}));
  };

  // Handlers for opening and closing the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Helper function to apply filters
  const applyFilters = (data) => {
    let filteredData = [...data];

    // Filter by field and operator
    if (field && operator && value) {
      filteredData = filteredData.filter((item) => {
        const fieldValue = item[field];
        switch (operator) {
          case "equals":
            return fieldValue === value;
          case "contains":
            return String(fieldValue)
              .toLowerCase()
              .includes(value.toLowerCase());
          case "greaterThan":
            return parseFloat(fieldValue) > parseFloat(value);
          case "lessThan":
            return parseFloat(fieldValue) < parseFloat(value);
          default:
            return true;
        }
      });
    }

    // Filter by range (if applicable)
    if (field === "price" && range) {
      filteredData = filteredData.filter((item) => {
        const price = parseFloat(item.price);
        return price >= range[0] && price <= range[1];
      });
    }

    // Sorting
    if (sorting) {
      filteredData.sort((a, b) => {
        const valA = a[field];
        const valB = b[field];

        if (sorting === "ascending") {
          return valA > valB ? 1 : -1;
        } else if (sorting === "descending") {
          return valA < valB ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  };

  // Handler to apply the filter
  const handleApplyFilter = () => {
    if (selectedTable && connectedData.length > 0) {
      const tableData = connectedData[0][selectedTable] || [];
      const filteredData = applyFilters(tableData);
      setFilteredData(filteredData); //storing filtered data
      // console.log("Filtered Data:", filteredData);

      // Optionally, update the node's data for downstream use
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, outputData: filteredData } }
            : node
        )
      );
    }
    setOpen(false);
  };

  return (
    <>
      <div className="container">
        <Handle type="target" position={Position.Left} />
        <Tooltip title="Data Actions" placement="top">
          <Image
            src="/assets/dataaction.png"
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
      <div className="node-label">Data Action</div>

      {/* Modal Dialog for Data Action Filters */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Configure Data Actions</DialogTitle>
        <DialogContent>
          <div>
            {/* Table Name Display */}
            <div style={{ marginBottom: 20 }}>
              <strong style={{ fontSize: "20px" }}>Table: </strong>
              <span style={{ fontSize: "20px" }}>{selectedTable}</span>
            </div>

            {/* Table Selector */}

            <FormControl fullWidth style={{ marginBottom: 15 }}>
              <InputLabel>Table</InputLabel>

              <Select
                value={selectedTable}
                onChange={handleTableChange}
                label="Table"
                disabled={tables.length === 0}
              >
                {tables.length === 0 ? (
                  <MenuItem value="" disabled>
                    No tables available
                  </MenuItem>
                ) : (
                  tables.map((table) => (
                    <MenuItem key={table} value={table}>
                      {table}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            {/* Field Selector */}
            <FormControl fullWidth style={{ marginTop: 10 }}>
              <InputLabel>Field</InputLabel>
              <Select
                value={field}
                onChange={(e) => setField(e.target.value)}
                label="Field"
                disabled={fields.length === 0 || !selectedTable}
              >
                {fields.length === 0 ? (
                  <MenuItem value="" disabled>
                    No fields available
                  </MenuItem>
                ) : (
                  fields.map((fieldName) => (
                    <MenuItem key={fieldName} value={fieldName}>
                      {fieldName}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            {/* Operator Selector */}
            <FormControl fullWidth style={{ marginTop: 20 }}>
              <InputLabel>Operator</InputLabel>
              <Select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                label="Operator"
              >
                <MenuItem value="equals">Equals</MenuItem>
                <MenuItem value="contains">Contains</MenuItem>
                <MenuItem value="greaterThan">Greater Than</MenuItem>
                <MenuItem value="lessThan">Less Than</MenuItem>
              </Select>
            </FormControl>

            {/* Value Input */}
            <TextField
              label="Value"
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ marginTop: 20 }}
            />

            {/* Range Selector (for numeric fields like Price) */}
            {field === "price" && (
              <>
                <div style={{ marginTop: 20 }}>Price Range</div>
                <Slider
                  value={range}
                  onChange={(e, newValue) => setRange(newValue)}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `$${value}`}
                  min={0}
                  max={1000}
                  style={{ marginTop: 10 }}
                />
              </>
            )}

            {/* Sorting Selector */}
            <FormControl fullWidth style={{ marginTop: 20 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sorting}
                onChange={(e) => setSorting(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="ascending">Ascending</MenuItem>
                <MenuItem value="descending">Descending</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsChildModalOpen(true)}
            color="primary"
            disabled={filteredData.length === 0}
          >
            Show Filtered Data
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApplyFilter} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/*Modal For child Table*/}

      <Dialog
        open={isChildModalOpen}
        onClose={() => setIsChildModalOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Filtered Data</DialogTitle>
        <DialogContent
          style={{
            overflowY: "hidden", // Prevent outer scrollbars
          }}
        >
          <TableContainer
            style={{
              maxHeight: "420px",
              overflowX: "auto",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {fields.map((field) => (
                    <TableCell
                      key={field}
                      style={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#f5f5f5",
                        zIndex: 1,
                      }}
                    >
                      {field}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow key={index}>
                    {fields.map((field) => (
                      <TableCell key={field}>{row[field]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsChildModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataActionNode;
