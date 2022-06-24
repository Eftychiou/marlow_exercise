import { Root as CommentsData } from "./comments";
import { IVideo } from "./video";

export interface ICombinedState {
  videos: IVideoState;
  comments: ICommentsState;
}

export interface ICommentsState {
  selectedVideoComments: CommentsData | null;
}

export interface IVideoState {
  videos: IVideo[];
  selectedVideo: IVideo | null;
}
