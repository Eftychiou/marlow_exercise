import _ from "lodash";

import * as actionTypes from "../actions/actionTypes";
import { IVideoState } from "../../interfaces/state";
import { IAction } from "../../interfaces/actions";

const initialState: IVideoState = {
  videos: [],
  selectedVideo: null,
};

const listVideos = (state, action) => {
  const clonedState = _.cloneDeep(state);
  return {
    ...clonedState,
    videos: action.videos,
  };
};
const selectVideo = (state, action) => {
  const clonedState = _.cloneDeep(state);
  return {
    ...clonedState,
    selectedVideo: action.selectedVideo,
  };
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.LIST_VIDEOS: return listVideos(state, action);
    case actionTypes.SELECT_VIDEO: return selectVideo(state, action);
    default: return state;
  }
};

export default reducer;
