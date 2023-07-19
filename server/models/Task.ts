import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: false, trim: true },
});

const TaskModel = mongoose.model("task", taskSchema);

export default TaskModel;
