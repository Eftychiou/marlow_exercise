import { IVideo } from "src/interfaces/video";
import * as actionTypes from "../actions/actionTypes";
import { loadComments } from "../../lib/tools";
import { Root as CommentsData } from "../../interfaces/comments";

export const searchVideo = (videos: IVideo[], selectedVideo: IVideo) => {
  return (dispatch) => {
    dispatch(selectVideo(selectedVideo));
    dispatch(listVideos(videos));
  };
};
export const listVideos = (videos: IVideo[]) => {
  return { type: actionTypes.LIST_VIDEOS, videos };
};
export const selectVideo = (selectedVideo: IVideo) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SELECT_VIDEO, selectedVideo });
    if (!selectedVideo?.id?.videoId) return;
    loadComments(selectedVideo.id.videoId)
      .then((data: CommentsData) => {
        dispatch({ type: actionTypes.STORE_COMMENTS, commentsData: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
