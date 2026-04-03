import { useState } from "react";
import { Box, Button, TextField, Avatar } from "@mui/material"
import type { CommentInterface } from "../store/slices/commentSlice";
import type { User } from "../store/slices/userSlice";
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from './Modal';

import CommentStripe from "./CommentStripe";

interface Props {
    item: {
        id: number;
        createdAt: string;
        imageUrl: string;
        description: string;
        commentCount: number;
        user: User
    };
    onShowComments: (id: number) => void,
    handleDeletePost: (id: number) => void,
    comments: CommentInterface[],
    user: User | null,
    newComment: string;
    setNewComment: (text: string) => void;
    handleAddComment: () => void,
    handleDeleteComment: (postId: number, commentId: number) => void,
    isLoadingComments: boolean;
    fetchError: string | null;
    addCommentError: string | null;
    isOpen: boolean
}

const PostUI2 = ({ item, onShowComments, handleDeletePost, comments, user, newComment, setNewComment, handleAddComment, handleDeleteComment, isLoadingComments, fetchError, addCommentError }: Props) => {

    const [isDeleteModalOPen, setIsDeleteModalOPen] = useState(false);

    const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Box
            className="stripe__post"
            sx={{
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: '#e7fe50',
                position: 'relative'
            }}
        >

            <Box sx={{
                display: "flex",
                gap: '5px',
                position: 'relative'
            }}>

                <Box sx={{
                    padding: '5px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#B0DEF5',
                        transition: '0.6s'
                    }
                }}>


                    {(user?.id === item.user?.id || user?.isAdmin) && (
                        <DeleteIcon sx={{
                            fontSize: '25px',
                        }}
                            color="error"
                            onClick={() => setIsDeleteModalOPen(true)} />
                    )}
                </Box>

                <Avatar>{item.user.username[0].toUpperCase()} </Avatar>

                <Box>
                    <div> <b>{item.user.username}</b></div>
                    <p>
                        {item.description.length > 100
                            ? item.description.slice(0, 100)
                            : item.description}
                    </p>
                    <img src={item.imageUrl} alt="image unavailable" style={{ maxWidth: "400px", maxHeight: '500px', borderRadius: "8px" }} />
                    <div>{formattedDate}</div>
                    <Box sx={{
                        display: 'flex',
                        gap: '5px',
                        marginTop: '10px'
                    }}>

                        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                            {item.commentCount > 0
                                ? <Box onClick={() => onShowComments(item.id)}
                                    sx={{
                                        cursor: 'pointer',
                                        padding: '5px',
                                        borderRadius: '50%',
                                        '&:hover': {
                                            backgroundColor: '#B0DEF5',
                                            transition: '0.6s'
                                        }
                                    }}>
                                    <CommentIcon width='18px' />
                                </Box>
                                : <Box
                                    sx={{
                                        cursor: 'pointer',
                                        padding: '5px',
                                        borderRadius: '50%',
                                        '&:hover': {
                                            backgroundColor: '#B0DEF5',
                                            transition: '0.6s'
                                        }
                                    }}>
                                    <CommentIcon width='18px' />
                                </Box>}
                            <span>{item.commentCount}</span>
                        </div>
                    </Box>
                </Box>
            </Box>

            {user && (
                <>
                    {addCommentError && (
                        <Box sx={{ marginTop: "10px" }}>
                            {addCommentError}
                        </Box>
                    )}

                    <Box sx={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                        <TextField
                            size="small"
                            fullWidth
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            error={!!addCommentError}
                        />
                        <Button variant="contained" onClick={handleAddComment}>
                            Add
                        </Button>
                    </Box>
                </>
            )}




            {fetchError && (
                <Box sx={{ marginTop: "10px" }}>
                    {fetchError}
                </Box>
            )}


            {isLoadingComments
                ? <Box sx={{ marginTop: "10px", textAlign: "center" }}>
                    Loading comments...
                </Box>
                : comments.length > 0
                    ? <CommentStripe
                        comments={comments}
                        handleDeleteComment={handleDeleteComment}
                        user={user}
                        itemId={item.id} />
                    : null
            }

            {isDeleteModalOPen && (
                <Modal
                    onConfirm={() => {
                        handleDeletePost(item.id);
                        setIsDeleteModalOPen(false);
                    }
                    }
                    onCancel={() => setIsDeleteModalOPen(false)}
                />
            )}

        </Box>
    );
};

export default PostUI2;