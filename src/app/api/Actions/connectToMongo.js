"use server";
import mongoose from "mongoose";
const { MongoClient, ObjectId } = require("mongodb");

export const fetchAllData = async (connectionString) => {
  try {
    const connection = await mongoose
      .createConnection(connectionString)
      .asPromise();
    console.log("Connected to MongoDB:", connectionString);
    const db = connection.db;
    const collections = await db.listCollections().toArray();
    const data = {};

    for (const collection of collections) {
      const collectionName = collection.name;
      const documents = await db.collection(collectionName).find({}).toArray();
      data[collectionName] = documents;
    }

    // Close the connection after fetching data
    // await connection.close();

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Api to fetch Schema Details.
// export const fetchSchema = async (connectionString, collection) => {
//   const client = new MongoClient(connectionString);
//   await client.connect();
//   const db = client.db();
//   const col = db.collection(collection);

//   // Fetch a sample document to determine the schema
//   const sampleDocument = await col.findOne({});
//   await client.close();

//   if (!sampleDocument) {
//     throw new Error("No documents found in the collection.");
//   }

//   // Convert the sample document into a schema format
//   return Object.keys(sampleDocument).map((key) => ({
//     name: key,
//     type: typeof sampleDocument[key], // Infer type from the sample document
//   }));
// };

// //Api to create Data in db
// // Perform CRUD operations
// export const crudOperations = async (operation, connectionString, collection, data = {}) => {
//   console.log('data in api', data);
//   try {
//     const connection = await mongoose.createConnection(connectionString).asPromise();
//     const db = connection.db;
//     const col = db.collection(collection);

//     let result;

//     switch (operation) {
//       case "create":
//         result = await col.insertOne(data);
//         break;
//       case "read":
//         result = await col.find({}).toArray();
//         break;
//       case "update":
//         // Convert _id to ObjectId if it's provided as a string
//         if (data._id && typeof data._id === 'string') {
//           data._id = new ObjectId(data._id);
//         }
//         result = await col.findOneAndUpdate({ _id: data._id }, { $set: data });
//         break;
//         case "delete":
//           // Convert _id to ObjectId if it's provided as a string
//           if (data._id && typeof data._id === 'string') {
//             data._id = new ObjectId(data._id);
//           }
//           result = await col.deleteOne(data);
//           break;
//       default:
//         throw new Error("Invalid operation");
//     }

//     // Close the connection after the operation
//     await connection.close();

//     return JSON.parse(JSON.stringify(result));
//   } catch (error) {
//     console.error("Database operation failed:", error);
//     throw error;
//   }
// };

export const fetchSchema = async (connectionString, collection) => {
  const client = new MongoClient(connectionString);
  await client.connect();
  const db = client.db();
  const col = db.collection(collection);

  // Fetch a sample document to determine the schema
  const sampleDocument = await col.findOne({});
  await client.close();

  if (!sampleDocument) {
    throw new Error("No documents found in the collection.");
  }

  // Convert the sample document into a schema format
  return Object.keys(sampleDocument).map((key) => ({
    name: key,
    type: typeof sampleDocument[key], // Infer type from the sample document
  }));
};

// Perform CRUD operations
export const crudOperations = async (
  operation,
  connectionString,
  collection,
  data = {}
) => {
  try {
    const connection = await mongoose
      .createConnection(connectionString)
      .asPromise();
    const db = connection.db;
    const col = db.collection(collection);

    let result;

    switch (operation) {
      case "create":
        result = await col.insertOne(data);
        break;
      case "read":
        // Convert _id to ObjectId if it's provided
        if (data._id && typeof data._id === "string") {
          data._id = new ObjectId(data._id);
        }
        result = await col.find(data).toArray();
        break;
      case "update":
        // Convert _id to ObjectId if it's provided as a string
        if (data._id && typeof data._id === "string") {
          data._id = new ObjectId(data._id);
        }
        result = await col.findOneAndUpdate({ _id: data._id }, { $set: data });
        break;
      case "delete":
        // Convert _id to ObjectId if it's provided as a string
        if (data._id && typeof data._id === "string") {
          data._id = new ObjectId(data._id);
        }
        result = await col.deleteOne(data);
        break;
      default:
        throw new Error("Invalid operation");
    }

    // Close the connection after the operation
    await connection.close();

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Database operation failed:", error);
    throw error;
  }
};
