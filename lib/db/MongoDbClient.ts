// MongoDB client for the NextAuth adapter.
// The connection is established lazily (only when the adapter is first used),
// so importing this module never requires DATABASE_URL at build time.
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function createClient(): MongoClient {
  if (!uri) {
    throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
  }
  return new MongoClient(uri);
}

/**
 * Returns a cached promise that resolves to a connected MongoClient.
 * The global cache keeps the connection alive across HMR reloads in dev.
 */
export default function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) return clientPromise;

  if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClientPromise) {
      client = createClient();
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    client = createClient();
    clientPromise = client.connect();
  }

  return clientPromise;
}
