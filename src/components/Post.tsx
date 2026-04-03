import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchComments, addComment, deleteExhibitComment } from "../store/slices/commentSlice";
import { deletePost } from "../store/slices/exhibitSlices";
import { incrementCommentCount, decrementCommentCount } from "../store/slices/exhibitSlices";
import type { User } from '../store/slices/userSlice'

// import PostUI from "./PostUI";
import PostUI2 from "./PostUI2";

interface Props {
    item: {
        id: number;
        createdAt: string;
        imageUrl: string;
        description: string;
        commentCount: number;
        user: User
    };
}

const Post = ({ item }: Props) => {
    const dispatch = useAppDispatch();

    const comments = useAppSelector(
        (state) => state.comments.commentsByPostId[item.id]
    );

    const user = useAppSelector((state) => state.user.user);

    const safeComments = comments ?? [];

    const [isOpen, setIsOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [addCommentError, setAddCommentError] = useState<string | null>(null);

    const handleComments = async (id: number) => {
        setIsOpen((prev) => !prev);

        setIsLoadingComments(true);
        setFetchError(null);

        try {
            await dispatch(fetchComments(id)).unwrap();
        } catch (error) {
            console.error('Failed to fetch comments:', error);
            setFetchError('Failed to load comments. Please try again.');
        } finally {
            setIsLoadingComments(false);
        }
    };


    const handleDeletePost = (id: number) => {
        try {
            dispatch(deletePost(id)).unwrap()

        } catch (error) {
            console.log('Error: ' + error);
        }

    }

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        setAddCommentError(null);
        try {
            await dispatch(addComment({ postId: item.id, text: newComment })).unwrap();
            dispatch(incrementCommentCount(item.id));
            setNewComment("");
        } catch (error) {
            console.log("Failed to add comment:", error);
            setAddCommentError('Failed to add comment. Please try again.');
        }
    };

    const handleDeleteComment = async (postId: number, commentId: number) => {
        try {
            await dispatch(deleteExhibitComment({ postId, commentId }));
            await dispatch(decrementCommentCount(postId));
        } catch (error) {
            console.log('Error:' + error);
        }
    }

    return (
        // <PostUI
        //     item={item}
        //     onShowComments={handleComments}
        //     handleDeletePost={handleDeletePost}
        //     comments={isOpen ? safeComments : []}
        //     user={user}
        //     newComment={newComment}
        //     setNewComment={setNewComment}
        //     handleAddComment={handleAddComment}
        //     handleDeleteComment={handleDeleteComment}
        //     isLoadingComments={isLoadingComments}
        //     fetchError={fetchError}
        //     addCommentError={addCommentError}
        // />

        <PostUI2
            item={item}
            onShowComments={handleComments}
            handleDeletePost={handleDeletePost}
            isOpen={isOpen}
            comments={isOpen ? safeComments : []}
            user={user}
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            handleDeleteComment={handleDeleteComment}
            isLoadingComments={isLoadingComments}
            fetchError={fetchError}
            addCommentError={addCommentError}
        />
    );
};

export default Post;