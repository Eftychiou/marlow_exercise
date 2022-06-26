import { IVideo } from "src/interfaces/video";
import ActionTypes from "../actions/actionTypes";
import { loadComments } from "../../lib/tools";
import { Root as CommentsData } from "../../interfaces/comments";

export const searchVideo = (videos: IVideo[], selectedVideo: IVideo) => {
  return (dispatch) => {
    dispatch(selectVideo(selectedVideo));
    dispatch(listVideos(videos));
  };
};
export const listVideos = (videos: IVideo[]) => {
  return { type: ActionTypes.LIST_VIDEOS, videos };
};
export const selectVideo = (selectedVideo: IVideo) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SELECT_VIDEO, selectedVideo });
    if (!selectedVideo?.id?.videoId) return;
    loadComments(selectedVideo.id.videoId)
      .then((data: CommentsData) => {
        dispatch({ type: ActionTypes.STORE_COMMENTS, commentsData: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
