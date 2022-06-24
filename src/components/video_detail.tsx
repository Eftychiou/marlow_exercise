import { connect } from "react-redux";

import { ICombinedState } from "src/interfaces/state";
import Spinner from "../shared/loading_spinner";
import { VideoDetailProps } from "src/interfaces/components";



const VideoDetail = ({selectedVideo}: VideoDetailProps) => {
  if (!selectedVideo) return <Spinner />;
  const url = `https://www.youtube.com/embed/${selectedVideo?.id?.videoId}`;
    return (
    <div className='video-detail col-lg-8 order-lg-2' >
      <div className='embed-responsive embed-responsive-16by9'>
        <iframe title={selectedVideo.snippet.title} className='embed-responsive-item' src={url} />
      </div>
      <div className='details'>
        <div>{selectedVideo.snippet.title}</div>
        <div>{selectedVideo.snippet.description}</div>
      </div>
      
    </div>
  );
};

const mapStateToProps = (state: ICombinedState) => {
  return {
    selectedVideo: state.videos.selectedVideo,    
  };
};

export default connect(mapStateToProps)(VideoDetail);
