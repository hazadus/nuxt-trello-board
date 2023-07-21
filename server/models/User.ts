import { Schema, model } from "mongoose";
import { IUser } from "@/types";

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
  },
  // This automatically adds `createdAt` and `updatedAt` fields in the schema:
  { timestamps: true },
);

export const UserModel = model<IUser>("User", userSchema);
