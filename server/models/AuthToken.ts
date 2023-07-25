import { Schema, model } from "mongoose";
import { IAuthToken } from "@/types";

const authTokenSchema = new Schema<IAuthToken>(
  {
    token: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const AuthTokenModel = model<IAuthToken>("AuthToken", authTokenSchema);
