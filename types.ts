export type ID = string;

export interface Column {
  _id?: ID;
  title: string;
  tasks: Task[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Task {
  _id?: ID;
  title: string;
  details?: string | null;
  isCompleted: boolean;
  isFavorite: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  completedAt?: Date | null;
}

export interface ITaskWithTargetColumnId {
  targetColumnID: ID;
  task: Task;
}
