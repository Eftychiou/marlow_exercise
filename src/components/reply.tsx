import classes from "./comment.module.scss";
import { Item as IReply } from "../interfaces/reply";
import { dateDif, setFallbackImg } from "../lib/tools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

export default function Reply({
  replyData,
  showNotification,
}: {
  replyData: IReply;
  showNotification;
}) {
  return (
    <div className={classes.Comment}>
      <div className={classes.left}>
        <img
          src={replyData?.snippet?.authorProfileImageUrl}
          alt='MarlowExercise'
          onError={setFallbackImg}
        />
      </div>
      <div className={classes.right}>
        <h3 className={classes.user}>
          {replyData?.snippet?.authorDisplayName}{" "}
          <span>{dateDif(replyData?.snippet?.publishedAt)}</span>
        </h3>
        <p className={classes.text}>{replyData?.snippet?.textDisplay}</p>
        <p className={classes.likesDislikes} onClick={showNotification}>
          <span>
            <FontAwesomeIcon icon={faThumbsUp} />{" "}
            {replyData?.snippet?.likeCount}
          </span>
          <span>
            <FontAwesomeIcon icon={faThumbsDown} /> N/A
          </span>
          <span>REPLY</span>
        </p>
      </div>
    </div>
  );
}
