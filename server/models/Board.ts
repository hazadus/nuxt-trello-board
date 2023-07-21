import { Schema, model } from "mongoose";
import { Board } from "@/types";

const boardSchema = new Schema<Board>(
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

export const BoardModel = model<Board>("Board", boardSchema);
