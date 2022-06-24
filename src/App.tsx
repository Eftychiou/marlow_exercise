/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import YTSearch from "youtube-api-search";

import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import * as actions from "./store/actions/index";
import { IVideo } from "./interfaces/video";
import { ICombinedState } from "./interfaces/state";
import Comments from "./components/comments";
import {Root as CommentsData} from './interfaces/comments';

const App = ({onSearchVideoHandler,selectedVideoComments}:{onSearchVideoHandler:Function,selectedVideoComments:CommentsData}) => {
  
  useEffect(() => {
    videoSearch("quagmire");
  }, []);
  const delayedVideoSearch = (term: string) => {
    YTSearch(
      { key: process.env.REACT_APP_APIURL, term: term },
      (videos: IVideo[]) => {
        onSearchVideoHandler(videos, videos[0]);
      }
    );
  };
  /**
   * Wrapped the debouncer with useCallback hook so the function is not recreated on every render
   */
  const videoSearch = useCallback(
    _.debounce((term) => delayedVideoSearch(term), 1000),
    []
  );
  return (
    <div className="d-flex">      
      <SearchBar onSearchTermChange={videoSearch} />
      <VideoDetail />
      <VideoList />
      {selectedVideoComments && <Comments />}
    </div>
  );
};

const mapStateToProps = (state: ICombinedState) => {
  return {    
    selectedVideoComments: state.comments.selectedVideoComments,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onSearchVideoHandler: (videos: IVideo[], selectedVideo: IVideo) =>
      dispatch(actions.searchVideo(videos, selectedVideo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
