import _ from "lodash";

import * as actionTypes from "../actions/actionTypes";
import { ICommentsState } from "../../interfaces/state";
import { IAction } from "../../interfaces/actions";
import { Root as CommentsData } from "../../interfaces/comments";

const initialState: ICommentsState = {
  selectedVideoComments: null,
};

const loadComments = (
  state: ICommentsState,
  { commentsData }: { commentsData: CommentsData }
) => {
  const clonedState = _.cloneDeep(state);
  clonedState.selectedVideoComments = commentsData;
  return clonedState;
};

const storeComments = (
  state: ICommentsState,
  { commentsData }: { commentsData: CommentsData }
) => {
  const clonedState = _.cloneDeep(state);
  clonedState.selectedVideoComments = commentsData;
  return clonedState;
};

const appendComments = (
  state: ICommentsState,
  { commentsData }: { commentsData: CommentsData }
) => {
  const clonedState = _.cloneDeep(state);
  clonedState.selectedVideoComments.items = [
    ...clonedState.selectedVideoComments.items,
    ...commentsData.items,
  ];
  return clonedState;
};

const loadReplies = (state: ICommentsState, action) => {
  const clonedState = _.cloneDeep(state);
  const replies = action.replies;
  const parentId = action.parentId;
  const indexOfParent = state.selectedVideoComments.items.findIndex(
    (comment) => comment.id === parentId
  );
  clonedState.selectedVideoComments.items[indexOfParent].replies = replies;
  return clonedState;
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.LOAD_COMMENTS: return loadComments(state, action);
    case actionTypes.STORE_COMMENTS: return storeComments(state, action);
    case actionTypes.APPEND_COMMENTS: return appendComments(state, action);
    case actionTypes.LOAD_REPLIES: return loadReplies(state, action);
    default: return state;
  }
};

export default reducer;
