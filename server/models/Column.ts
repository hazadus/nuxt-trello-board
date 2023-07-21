import { Schema, model } from "mongoose";
import { Column } from "@/types";

const columnSchema = new Schema<Column>(
  {
    title: { type: String, required: true },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true },
);

export const ColumnModel = model<Column>("Column", columnSchema);
