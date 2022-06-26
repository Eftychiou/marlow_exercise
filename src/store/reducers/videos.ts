import _ from "lodash";

import ActionTypes from "../actions/actionTypes";
import { IVideoState } from "../../interfaces/state";
import { IAction } from "../../interfaces/actions";

const initialState: IVideoState = {
  videos: [],
  selectedVideo: null,
};

const listVideos = (state, action):IVideoState => {
  const clonedState = _.cloneDeep(state);
  return {
    ...clonedState,
    videos: action.videos,
  };
};
const selectVideo = (state, action):IVideoState => {
  const clonedState = _.cloneDeep(state);
  return {
    ...clonedState,
    selectedVideo: action.selectedVideo,
  };
};

const reducer = (state = initialState, action: IAction):IVideoState => {
  switch (action.type) {
    case ActionTypes.LIST_VIDEOS: return listVideos(state, action);
    case ActionTypes.SELECT_VIDEO: return selectVideo(state, action);
    default: return state;
  }
};

export default reducer;
