import { UserBasic } from "./user.interface";

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: UserBasic;
  parentId?: string;
}