import { Schema, model } from "mongoose";
import { IColumn } from "@/types";

const columnSchema = new Schema<IColumn>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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

export const ColumnModel = model<IColumn>("Column", columnSchema);
