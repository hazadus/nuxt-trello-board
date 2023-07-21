export type ID = string;

export interface IBoard {
  _id?: ID;
  title: string;
  columns: IColumn[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IColumn {
  _id?: ID;
  title: string;
  tasks: ITask[];
  targetBoardId?: ID;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITask {
  _id?: ID;
  title: string;
  details?: string | null;
  isCompleted: boolean;
  isFavorite: boolean;
  targetColumnId?: ID;
  createdAt?: Date;
  updatedAt?: Date;
  completedAt?: Date | null;
}
