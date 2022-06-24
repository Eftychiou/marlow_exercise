import classes from "./comment.module.scss";
import { CommentProps } from "../interfaces/components";
import { Replies, Item as IReply } from "../interfaces/reply";
import Reply from "./reply";
import { dateDif, setFallbackImg } from "../lib/tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { constructYoutubeApiUrl } from "../lib/tools";
import {
  faThumbsUp,
  faThumbsDown,
  faSortDown,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Comment({
  commentData,
  lastComRef,
  videoId,
  onLoadCommentsReplies,
  showNotification,
  isLastComment,
}: CommentProps) {
  useEffect(() => {
    //Togglening off all replies buttons for the next search video
    setIsShowReplies(false);
    setRepliesLoaded(false);
  }, [videoId]);
  const [isShowReplies, setIsShowReplies] = useState(false);
  const [repliesLoaded, setRepliesLoaded] = useState(false);

  const loadRepliesForAComment = (parentId) => {
    const url = constructYoutubeApiUrl(
      { url: "https://youtube.googleapis.com/youtube/v3/comments" },
      { part: "id,snippet" },
      { maxResults: "99" },
      { parentId },
      { textFormat: "plainText" },
      { key: process.env.REACT_APP_APIURL }
    );
    if (!repliesLoaded) {
      axios(url as string)
        .then(({ data }: { data: Replies }) => {
          onLoadCommentsReplies(data, parentId);
          setIsShowReplies((prevState) => !prevState);
          setRepliesLoaded(true);
        })
        .catch((err) => console.log(err));
    } else setIsShowReplies((prevState) => !prevState);
  };
  return (
    <div className={classes.Comment} ref={isLastComment ? lastComRef : null}>
      <div className={classes.left}>
        <img
          src={
            commentData.snippet.topLevelComment.snippet.authorProfileImageUrl
          }
          alt='MarlowExercise'
          onError={setFallbackImg}
        />
      </div>
      <div className={classes.right}>
        <h4 className={classes.user}>
          {commentData.snippet.topLevelComment.snippet.authorDisplayName}
          <span>
            {dateDif(commentData.snippet.topLevelComment.snippet.publishedAt)}
          </span>
        </h4>
        <p className={classes.text}>
          {commentData.snippet.topLevelComment.snippet.textDisplay}
        </p>
        <p className={classes.likesDislikes} onClick={showNotification}>
          <span>
            <FontAwesomeIcon icon={faThumbsUp} style={{ cursor: "pointer" }} />{" "}
            {commentData.snippet.topLevelComment.snippet.likeCount}
          </span>
          <span>
            <FontAwesomeIcon
              icon={faThumbsDown}
              style={{ cursor: "pointer" }}
            />{" "}
            N/A
          </span>
          <span>REPLY</span>
        </p>
        {commentData.snippet.totalReplyCount !== 0 && (
          <p
            className={classes.repliesLength}
            onClick={() => loadRepliesForAComment(commentData.id)}>
            <FontAwesomeIcon
              icon={faSortDown}
              style={{ verticalAlign: "top", marginRight: "0.5rem" }}
            />{" "}
            {commentData.snippet.totalReplyCount}{" "}
            {commentData.snippet.totalReplyCount === 1 ? "Reply" : "Replies"}
          </p>
        )}

        {commentData?.replies?.items && isShowReplies && (
          <div className={classes.replies}>
            {commentData?.replies?.items?.map((reply: IReply, index) => (
              <Reply
                replyData={reply}
                key={index}
                showNotification={showNotification}
              />
            ))}
          </div>
        )}
      </div>
      <FontAwesomeIcon icon={faEllipsisV} className={classes.ellipsis} />
    </div>
  );
}
