import mongoose from "mongoose";
import { env } from "./env";

declare global {
  var _mongooseConnection:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const MONGO_URI = env.DATABASE_URL;

if (!MONGO_URI) {
  throw new Error("DATABASE_URL is not defined in environment variables.");
}

let cached = global._mongooseConnection;

if (!cached) {
  cached = global._mongooseConnection = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached?.conn) return cached.conn;

  if (!cached?.promise) {
    cached!.promise = mongoose
      .connect(MONGO_URI,{bufferCommands:false, dbName:env.DB_NAME})
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("Database failed to connect", err);
        throw err;
      });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export async function getClient() {
  const conn = await connectDB();
  return conn.connection.getClient().db(env.DB_NAME);
}