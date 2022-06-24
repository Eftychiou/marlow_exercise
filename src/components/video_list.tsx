import { connect } from "react-redux";

import * as actions from "../store/actions/index";
import VideoListItem from "./video_list_item";
import { IVideo } from "../interfaces/video";
import { VideoListProps } from "../interfaces/components";
import { ICombinedState } from "../interfaces/state";
const VideoList = ({ videos,  onVideoSelectHandler}:VideoListProps) => {
  const videoItems = videos.map((video: IVideo) => {
    return (
      <VideoListItem onVideoSelect={onVideoSelectHandler} key={video.etag} video={video} />
    );
  });

  return <ul className='col-lg-4 list-group order-lg-3'>{videoItems}</ul>;
};

const mapStateToProps = (state: ICombinedState) => {
  return {
    videos: state.videos.videos,    
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onVideoSelectHandler: (selectedVideo: IVideo) =>
      dispatch(actions.selectVideo(selectedVideo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
