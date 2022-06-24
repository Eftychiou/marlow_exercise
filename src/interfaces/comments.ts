import { Replies } from "./reply";
export interface Root {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  nextPageToken: string;
  items: Item[];
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  replies: Replies;
}

export interface Snippet {
  videoId: string;
  topLevelComment: TopLevelComment;
  canReply: boolean;
  totalReplyCount: number;
  isPublic: boolean;
}

export interface TopLevelComment {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet2;
}

export interface Snippet2 {
  videoId: string;
  textDisplay: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  authorChannelId: AuthorChannelId;
  canRate: boolean;
  viewerRating: string;
  likeCount: number;
  publishedAt: string;
  updatedAt: string;
}

export interface AuthorChannelId {
  value: string;
}
