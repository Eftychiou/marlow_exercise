import * as actionTypes from "../actions/actionTypes";
import { Replies } from "src/interfaces/reply";
import { Root as CommentsData } from "../../interfaces/comments";
import { loadComments } from "../../lib/tools";

export const storeComments = (loadedComments: CommentsData) => {
  return { type: actionTypes.STORE_COMMENTS, loadedComments };
};
export const appendNextPageData = (commentsData: CommentsData) => {
  return { type: actionTypes.APPEND_COMMENTS, commentsData };
};

export const loadAndAppendNextPageData = (
  nextPageToken: string,
  videoId: string
) => {
  return (dispatch) => {
    if (!nextPageToken || !videoId) return;
    loadComments(videoId, nextPageToken)
      .then((data: CommentsData) => {
        dispatch(appendNextPageData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const loadCommentReplies = (replies: Replies, parentId: string) => {
  return { type: actionTypes.LOAD_REPLIES, replies, parentId };
};
