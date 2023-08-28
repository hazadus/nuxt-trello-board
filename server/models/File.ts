import { Schema, model } from "mongoose";
import { IFile } from "@/types";

const fileSchema = new Schema<IFile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    fileName: { type: String, required: true },
    size: { type: Number, required: true },
  },
  // This automatically adds `createdAt` and `updatedAt` fields in the schema:
  { timestamps: true },
);

export const FileModel = model<IFile>("File", fileSchema);
