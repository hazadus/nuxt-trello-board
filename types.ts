export type ID = string;

export interface IError {
  statusCode: number;
  statusMessage: string;
  message: string;
}

export interface IUser {
  _id?: ID;
  firstName?: string;
  lastName?: string;
  email: string;
  plainPassword?: string; // Used to pass password from frontend to backend when creating new user.
  hashedPassword?: string; // Used in DB schema to store hashed password; must not be passed to frontend.
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginCredentials {
  email: string;
  plainPassword: string;
}

export interface IAuthToken {
  _id?: ID;
  token: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

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
