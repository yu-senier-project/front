import apiClient from "../util/BaseUrl";

// 모든 게시물 가져오는 api
export const getAllFeed = async () => {
  return apiClient.get("/api/v1/post/home");
};

// 게시물 이미지 가져오는 api
export const getFeedImg = async (postId) => {
  return apiClient.get(`/api/v1/post/${postId}/media`);
};

// 게시물 댓글 조회 api
export const getFeedComment = async (postId) => {
  return apiClient.get(`/api/v1/post/${postId}/comment/list`);
};

// 대댓글 조회 api
export const getFeedCommentReply = async (postId, commentId) => {
  return apiClient.get(`/api/v1/post/${postId}/comment/${commentId}/list`);
};

// 게시글 작성 api
export const postFeed = async (data) => {
  try {
    const response = await axios.post(`/api/v1/post`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 게시글 작성시 이미지 파일 업로드 api
export const postFeedImg = async (data) => {
  try {
    const response = await axios.post(`/api/v1/post/media`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 댓글 작성 api
export const postComment = async (data) => {
  try {
    const response = await axios.post(`/api/v1/post/comment`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 대댓글 작성 api
export const postCommentReply = async (data) => {
  try {
    const response = await axios.post(`/api/v1/post/comment/reply`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 게시글 좋아요 api
export const postFeedLike = async (data) => {
  try {
    const response = await axios.post(`/api/v1/post/like`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 댓글 좋아요 api
export const postCommentLike = async (data) => {
  try {
    const response = await axios.post(`/api/v1/post/comment/like`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 게시물 삭제 api
export const deleteFeed = async (postId) => {
  try {
    const response = await axios.delete(`/api/v1/post/${postId}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 게시물 좋아요 취소 api
export const deleteFeedLike = async (data) => {
  try {
    const response = await axios.delete(`/api/v1/post/like`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 댓글 삭제 api
export const deleteComment = async (data) => {
  try {
    const response = await axios.delete(`/api/v1/post/comment`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 댓글 좋아요 취소 api
export const deleteCommentLike = async (data) => {
  try {
    const response = await axios.delete(`/api/v1/post/comment/like`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 게시물 수정 api
export const updateFeed = async (postId, data) => {
  try {
    const response = await axios.patch(`/api/v1/post/${postId}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
