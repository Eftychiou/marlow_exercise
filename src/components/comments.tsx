/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useCallback } from "react";
import { connect } from "react-redux";
import { ICombinedState } from "../interfaces/state";
import classes from "./comments.module.scss";

import { CommentsProps } from "../interfaces/components";
import { Replies } from "../interfaces/reply";
import Comment from "./comment";
import Button from "../shared/Button";
import Input from "../shared/Input";
import * as actions from "../store/actions/index";
import Notification from "../shared/notification";

const Comments = ({
  videoId,
  onLoadAndAppendNextPageData,
  onLoadCommentsReplies,
  selectedVideoComments,
}: CommentsProps) => {
  const [isShowNotification, setIsShowNotification] = useState(false);
  const observer: any = useRef();
  const nextPageToken = selectedVideoComments.nextPageToken || null;

  /**
   * A wrapped callback with useCallback so it's value changes only with nextPageToken changes. The callback observes if the last comment of the list is visible on the screen, so it can call the onLoadAndAppendNextPageData.
   */
  const lastCommentRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPageToken)
          onLoadAndAppendNextPageData(nextPageToken, videoId);
      });
      if (node) observer.current.observe(node);
    },
    [nextPageToken]
  );

  const showNotification = () => {
    setIsShowNotification(true);
    setTimeout(() => setIsShowNotification(false), 2000);
  };
  return (
    <div className="col-lg-8 order-md-4">
    <div className={classes.Comments}>
      <div className={classes.topContainer}>
        <div className={classes.totalComments}>n/a Comments</div>
        <div>
          <img src='/sort.png' alt='sort' />
          <h4>SORT BY</h4>
        </div>
      </div>
      <div className={classes.addCommentContainer}>
        <div className={classes.top}>
          <img alt='me' src='/images/me.png' className={classes.image} />
          <Input value='comment' label='Add a comment...' />
        </div>
        <div className={classes.bottomRightBtns}>
          <Button onclick={showNotification}>
            CANCEL
          </Button>
          <Button disabled={true} onclick={showNotification}>
            COMMENT
          </Button>
        </div>
      </div>
      <div className={classes.commentsList}>
        {selectedVideoComments.items?.map((commentData, index) => (
          <Comment
            key={index}
            commentData={commentData}
            lastComRef={lastCommentRef}
            isLastComment={
              selectedVideoComments.items.length === index + 1 ? true : false
            }
            videoId={videoId}
            onLoadCommentsReplies={onLoadCommentsReplies}
            showNotification={showNotification}
          />
        ))}
      </div>
      {isShowNotification && <Notification />}
    </div>
    </div>
  );
};

const mapStateToProps = (state: ICombinedState) => {
  return {
    videoId: state.videos.selectedVideo?.id?.videoId,
    selectedVideoComments: state.comments.selectedVideoComments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadAndAppendNextPageData: (nextPageToken: string, videoId: string) =>
      dispatch(actions.loadAndAppendNextPageData(nextPageToken, videoId)),
    onLoadCommentsReplies: (replies: Replies, parentId: string) =>
      dispatch(actions.loadCommentReplies(replies, parentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
