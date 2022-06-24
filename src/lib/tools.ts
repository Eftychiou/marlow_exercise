import axios from "axios";
import { Root as CommentsData } from "../interfaces/comments";

export const constructYoutubeApiUrl = (...params: any) => {
  let theUrl: string = "";
  for (let index = 0; index < params.length; index++) {
    let tempString: string = "";
    if (index === 0) {
      tempString = params[0].url;
    } else if (index === 1) {
      tempString = `?${Object.keys(params[1])}=${Object.values(params[1])}`;
    } else if (index > 1) {
      tempString = `&${Object.keys(params[index])}=${Object.values(
        params[index]
      )}`;
    }
    theUrl = theUrl + tempString;
  }
  return theUrl;
};

export const dateDif = (pastDate: string) => {
  const past = new Date(pastDate);
  const today = new Date();
  const diff = Math.floor(today.getTime() - past.getTime());
  const day = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / day);
  const months = Math.floor(days / 31);
  const years = Math.floor(months / 12);
  let message = " ";
  if (days < 31) {
    message = ` ${
      days === 0 ? "Today" : days === 1 ? "Yesterday" : days + " days ago"
    } `;
  } else if (months < 12) {
    message += `${months} ${months === 1 ? "month ago" : "months ago"} `;
  } else if (months >= 12) {
    message += `${years} ${years === 1 ? "year ago" : "years ago"} `;
  }
  return message;
};

export const setFallbackImg = (e) => {
  (e.target as HTMLImageElement).src = "/images/me.png";
};

export const loadComments = (videoId: string, nextPageToken?: string) => {
  const url = constructYoutubeApiUrl(
    { url: "https://youtube.googleapis.com/youtube/v3/commentThreads" },
    { part: "id,snippet" },
    { textFormat: "plainText" },
    { maxResults: "20" },
    { order: "relevance" },
    { videoId },
    { pageToken: nextPageToken || null },
    { key: process.env.REACT_APP_APIURL }
  );
  return axios(url as string)
    .then(({ data }: { data: CommentsData }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
