import { Schema, model } from "mongoose";
import { IBoard } from "@/types";

const boardSchema = new Schema<IBoard>(
  {
    // Documents references described here: https://mongoosejs.com/docs/subdocs.html
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
    hideCompletedCards: { type: Boolean, required: false },
  },
  { timestamps: true },
);

export const BoardModel = model<IBoard>("Board", boardSchema);
