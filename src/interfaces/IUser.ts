export interface IUser {
  id?: number;
  uuid: string;
  name: string;
  email: string;
  password?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  role?: any;
}
