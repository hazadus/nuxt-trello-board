import { Schema, model } from "mongoose";
import { ITask } from "@/types";

const taskSchema = new Schema<ITask>(
  {
    // Documents references described here: https://mongoosejs.com/docs/subdocs.html
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    details: { type: String, required: false },
    isCompleted: { type: Boolean, required: true },
    isFavorite: { type: Boolean, required: true },
    attachedFiles: [
      {
        type: Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    completedAt: { type: Date, required: false },
  },
  // This automatically adds `createdAt` and `updatedAt` fields in the schema:
  { timestamps: true },
);

export const TaskModel = model<ITask>("Task", taskSchema);
