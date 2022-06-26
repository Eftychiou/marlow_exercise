import ActionTypes from "../actions/actionTypes";
import { Replies } from "src/interfaces/reply";
import { Root as CommentsData } from "../../interfaces/comments";
import { loadComments } from "../../lib/tools";

export const storeComments = (loadedComments: CommentsData) => {
  return { type: ActionTypes.STORE_COMMENTS, loadedComments };
};
export const appendNextPageData = (commentsData: CommentsData) => {
  return { type: ActionTypes.APPEND_COMMENTS, commentsData };
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
  return { type: ActionTypes.LOAD_REPLIES, replies, parentId };
};
