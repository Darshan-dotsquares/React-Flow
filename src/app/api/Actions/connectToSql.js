"use server";
import mysql from "mysql2/promise";

export const fetchAllData = async (connectionString) => {
  let connection;
  try {
    // Create a connection to the SQL database
    connection = await mysql.createConnection({
      uri: connectionString,
      debug: true, // Enable debugging
    });

    console.log("Connected to database successfully!");

    // Fetch all table names
    const [tables] = await connection.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = DATABASE();"
    );

    if (tables.length === 0) {
      console.log("No tables found in the database.");
    }

    const data = {};

    // Loop through all tables and fetch their data
    for (const table of tables) {
      const tableName = table.TABLE_NAME;
      const [rows] = await connection.query(`SELECT * FROM ${tableName}`);
      data[tableName] = rows;
    }
    // console.log("Data fetched successfully:", data);
    // Return all data as a JSON object
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  } finally {
    if (connection) {
      // Close the connection
      await connection.end();
      console.log("Connection closed.");
    }
  }
};

// Function to fetch table structure
export const fetchTableStructure = async (connectionString, tableName) => {
  let connection;

  try {
    // Parse the connection string (e.g., "mysql://user:password@host:port/database")
    const url = new URL(connectionString);
    const dbConfig = {
      host: url.hostname,
      port: url.port || 3306, // Default MySQL port
      user: url.username,
      password: url.password,
      database: url.pathname.replace("/", ""), // Remove leading slash
    };

    // Create a connection to the database
    connection = await mysql.createConnection(dbConfig);

    // Query to fetch table structure
    const [rows] = await connection.execute(`DESCRIBE ${tableName}`);

    // Map the result to a structured format
    const tableStructure = rows.map((row) => ({
      name: row.Field, // Column name
      type: row.Type, // Column data type
      nullable: row.Null === "YES", // Whether the column is nullable
      key: row.Key, // Whether the column is a primary key
      default: row.Default, // Default value
      extra: row.Extra, // Additional information (e.g., auto_increment)
    }));

    return tableStructure;
  } catch (error) {
    console.error("Error fetching table structure:", error);
    throw error;
  } finally {
    // Close the connection
    if (connection) {
      await connection.end();
    }
  }
};

// Sanitizing table data
const sanitizeInputData = (inputData, tableSchema) => {
  console.log(
    "*************** sanitizeInputData function called ***************"
  );
  const errors = [];
  const sanitizedData = {};

  for (const column of tableSchema) {
    const columnName = column.Field; // Use the column name from the schema
    const dataType = column.Type.toLowerCase(); // Use the column type from the schema
    const isNullable = column.Null; // Whether the column is nullable
    const defaultValue = column.Default; // Get default value
    const value = inputData[columnName];

    // console.log("tableSchema:", JSON.stringify(tableSchema, null, 2));
    // console.log("inputData", inputData);
    // console.log("columnName", columnName);
    // console.log("dataType", dataType);
    // console.log("isNullable", isNullable);
    // console.log("value", value);

    // Handle missing values for non-nullable columns
    if (value === undefined || value === "") {
      if (!isNullable && defaultValue === null) {
        errors.push(`Column '${columnName}' is required.`);
      }
      sanitizedData[columnName] = isNullable ? null : undefined;
      continue;
    }

    // Sanitize based on data type
    try {
      switch (true) {
        case dataType.includes("int"):
        case dataType.includes("numeric"):
          sanitizedData[columnName] = Number(value);
          if (
            isNaN(sanitizedData[columnName]) ||
            sanitizedData[columnName] < 0
          ) {
            throw new Error(`Invalid number: ${value}`);
          }
          break;

        case dataType.includes("bool"):
          sanitizedData[columnName] = Boolean(value);
          break;

        case dataType.includes("date") || dataType.includes("timestamp"):
          sanitizedData[columnName] = new Date(value).toISOString();
          if (isNaN(new Date(value).getTime())) {
            throw new Error(`Invalid date: ${value}`);
          }
          break;

        case dataType.includes("json"):
          sanitizedData[columnName] = JSON.parse(value);
          break;

        default:
          sanitizedData[columnName] = value;
      }
    } catch (error) {
      errors.push(`Invalid value for column '${columnName}': ${error.message}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  return sanitizedData;
};

// CRUD operations API
export const sqlCrudOperations = async (
  operation,
  connectionString,
  tableName,
  rawData
) => {
  console.log(
    "################## sqlCrudOperations function called #############"
  );
  console.log("operation performed in sqlCrudOperations", operation);
  console.log("connectionString in sqlCrudOperations", connectionString);
  console.log("Table Name in sqlCrudOperations", tableName);
  console.log("rawData in sqlCrudOperations", rawData);

  let connection;

  try {
    // Parse the connection string (e.g., "mysql://user:password@host:port/database")
    const url = new URL(connectionString);
    const dbConfig = {
      host: url.hostname,
      port: url.port || 3306, // Default MySQL port
      user: url.username,
      password: url.password,
      database: url.pathname.replace("/", ""), // Remove leading slash
    };

    // Create a connection to the database
    connection = await mysql.createConnection(dbConfig);

    // Step 1: Fetch table schema
    const [tableSchema] = await connection.execute(`DESCRIBE ${tableName}`);

    // Step 2: Sanitize input data
    const sanitizedData = sanitizeInputData(rawData, tableSchema);
    // console.log("sanitizedData", sanitizedData);

    // Step 3: Perform the operation (e.g., INSERT/UPDATE)
    let result;
    switch (operation) {
      case "create":
        const insertColumns = Object.keys(sanitizedData).join(", ");
        const insertValues = Object.values(sanitizedData)
          .map(() => "?")
          .join(", ");
        const insertQuery = `INSERT INTO ${tableName} (${insertColumns}) VALUES (${insertValues})`;
        [result] = await connection.execute(
          insertQuery,
          Object.values(sanitizedData)
        );
        // sanitizing result sos that the server to client data transfer does not get any issue.
        const sanitizedResult = JSON.parse(JSON.stringify(result));
        console.log("Insert result", sanitizedResult);
        return sanitizedResult;

      case "update":
        // Step 1: Validate the ID
        if (!rawData.id) {
          throw new Error("ID is required for the update operation.");
        }

        console.log("ID being used for update:", rawData.id);

        // Step 2: Filter out fields that are not in the table schema
        const validFields = tableSchema.map((column) => column.Field);
        const filteredData = Object.keys(sanitizedData)
          .filter((key) => validFields.includes(key) && key !== "id") // Only include fields that exist in the table schema
          .reduce((acc, key) => {
            acc[key] = sanitizedData[key];
            return acc;
          }, {});

        // Step 3: Build the update query
        const updateFields = Object.keys(filteredData)
          .map((key) => `${key} = ?`)
          .join(", ");

        if (updateFields.length === 0) {
          throw new Error("No valid fields provided for update.");
        }

        const updateQuery = `UPDATE ${tableName} SET ${updateFields} WHERE id = ?`;

        // Step 4: Execute the query
        [result] = await connection.execute(updateQuery, [
          ...Object.values(filteredData),
          rawData.id,
        ]);

        // sanitizing result so that the server to client data transfer does not get any issue.
        const updatedSanitizedResult = JSON.parse(JSON.stringify(result));
        console.log("Update result", updatedSanitizedResult);
        return updatedSanitizedResult;

      // Add cases for read/delete
      case "read":
        if (rawData.id) {
          // Use WHERE clause to filter by ID
          const readQuery = `SELECT * FROM ${tableName} WHERE id = ?`;
          [result] = await connection.execute(readQuery, [rawData.id]);
          return result;
        } else {
          const readQuery = `SELECT * FROM ${tableName}`;
          [result] = await connection.execute(readQuery);
          // console.log("Read result", result);
          return result;
        }

      case "delete":
      case "delete":
        // Step 1: Validate the ID
        if (!rawData.id) {
          throw new Error("ID is required for the delete operation.");
        }

        // Step 2: Check if the record exists
        const checkQuery = `SELECT * FROM ${tableName} WHERE id = ?`;
        const [checkResult] = await connection.execute(checkQuery, [
          rawData.id,
        ]);

        if (checkResult.length === 0) {
          throw new Error(`Record with ID ${rawData.id} does not exist.`);
        }

        // Step 3: Perform the delete operation
        const deleteQuery = `DELETE FROM ${tableName} WHERE id = ?`;
        const [result] = await connection.execute(deleteQuery, [rawData.id]);

        // Step 4: Verify if the deletion was successful
        if (result.affectedRows === 0) {
          throw new Error(`Failed to delete record with ID ${rawData.id}.`);
        }

        console.log("Delete result", result);
        return { success: true, message: "Record deleted successfully." };

      default:
        throw new Error("Invalid operation");
    }
  } catch (error) {
    throw new Error(`Database operation failed: ${error.message}`);
  } finally {
    // Close the connection
    if (connection) {
      await connection.end();
    }
  }
};
