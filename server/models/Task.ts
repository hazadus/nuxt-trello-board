import { Schema, model, Model, Types } from "mongoose";
import { Column, Task } from "@/types";

const taskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    details: { type: String, required: false },
    isCompleted: { type: Boolean, required: true },
    isFavorite: { type: Boolean, required: true },
    //createdAt: { type: Date, required: true },
    completedAt: { type: Date, required: false },
  },
  // This automatically adds `createdAt` and `updatedAt` fields in the schema:
  { timestamps: true },
);

export const TaskModel = model<Task>("Task", taskSchema);

// Reference: https://mongoosejs.com/docs/typescript/subdocuments.html#handling-subdocuments-in-typescript
// `tasks[]` implemented as subdocuments below:
type ColumnDocumentProps = {
  tasks: Types.DocumentArray<Task>;
};
type ColumnModelType = Model<Column, {}, ColumnDocumentProps>;

export const ColumnModel = model<Column, ColumnModelType>(
  "Column",
  new Schema<Column, ColumnModelType>({
    title: { type: String, required: true },
    tasks: [taskSchema],
  }),
);
