// connect.js
import { MongoClient } from "mongodb";

const user = "adminUser";
const pass = encodeURIComponent(""); // encode special chars
const host = "40.160.225.25"; // or 127.0.0.1 if using SSH tunnel
const uri = `mongodb://${user}:${pass}@${host}:27017/?authSource=admin`;

async function main() {
  const client = new MongoClient(uri); // no useUnifiedTopology option necessary
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const info = await client.db("admin").command({ connectionStatus: 1 });
    console.log(info);
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await client.close();
  }
}

main();