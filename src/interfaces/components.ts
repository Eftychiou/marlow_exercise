import { IVideo } from "./video";
import { Root as CommentsData } from "./comments";
import { Item as IComment } from "./comments";

export interface VideoDetailProps {
  selectedVideo: IVideo;  
}

export interface CommentsProps {
  videoId: string;
  onLoadAndAppendNextPageData: Function;
  onLoadCommentsReplies: Function;
  selectedVideoComments: CommentsData;
}
export interface CommentProps {
  commentData: IComment;
  lastComRef: any | null;
  videoId: string;
  onLoadCommentsReplies: Function;
  showNotification;
  isLastComment: boolean;
}

export interface VideoListProps {
  videos: IVideo[];
  onVideoSelectHandler: Function;
}

