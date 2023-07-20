export type ID = string;

export interface Column {
  id: ID;
  title: string;
  tasks: Task[];
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
