import { Schema, model } from "mongoose";
import { IBoard } from "@/types";

const boardSchema = new Schema<IBoard>(
  {
    title: { type: String, required: true },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  { timestamps: true },
);

export const BoardModel = model<IBoard>("Board", boardSchema);
