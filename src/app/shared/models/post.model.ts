import { IComment } from "./comment.model";

export interface IPost {
  id: number;
  userId: number;
  body: string;
  title: string;
  isShowingComments?: boolean;
  comments?: IComment[];
}