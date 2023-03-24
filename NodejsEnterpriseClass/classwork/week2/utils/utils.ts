import mongoose from "mongoose";
import { ServerResponse } from "http";
import { handleError } from "../handleError";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

const validatePostId = (postId: string, res: ServerResponse): boolean => {
  if (!postId || !isValidObjectId(postId)) {
    handleError(res);
    return false;
  }
  return true;
};

function getPostIdFromUrl(url: string): string {
  const postId = url.split("/").pop();
  return postId ? postId : "";
}

function validateAndParsePostId(url: string, res: ServerResponse): string {
  const postId = getPostIdFromUrl(url);
  if (!validatePostId(postId, res)) {
    return "";
  }
  return postId;
}

export { validateAndParsePostId };
