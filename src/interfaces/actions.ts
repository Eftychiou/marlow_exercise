import { IVideo } from "./video";
import { Item, Root as CommentsData } from "./comments";
import { Replies } from "./reply";

export interface IAction {
  type: string;
  videos: any[];
  selectedVideo: IVideo | null;
  loadedComments: Item[];
  replies: Replies;
  parentId: string;
  commentsData: CommentsData;
}
