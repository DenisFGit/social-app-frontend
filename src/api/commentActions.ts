import apiClient from "./axiosInstance";

export const getComments = async (comment_id: number) => {
    return apiClient.get(`/api/exhibits/${comment_id}/comments`)
}

export const createComment = async (postId: number, text: string) => {
    return apiClient.post(`/api/exhibits/${postId}/comments`, { text });
}

export const deleteComment = async (exhibitId: number, commentId: number) => {
    return apiClient.delete(`/api/exhibits/${exhibitId}/comments/${commentId}`);
}
