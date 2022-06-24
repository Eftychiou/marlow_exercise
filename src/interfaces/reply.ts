export interface Replies {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface PageInfo {
  resultsPerPage: number;
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}

export interface Snippet {
  textDisplay: string;
  textOriginal: string;
  parentId: string;
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
