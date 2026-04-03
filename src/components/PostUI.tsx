import { Box, Button, TextField } from "@mui/material"
import type { CommentInterface } from "../store/slices/commentSlice";
import type { User } from "../store/slices/userSlice";
// import CommentIcon from '@mui/icons-material/Comment';

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
}

const PostUI = ({ item, onShowComments, handleDeletePost, comments, user, newComment, setNewComment, handleAddComment, handleDeleteComment, isLoadingComments, fetchError, addCommentError }: Props) => {

    const formattedDate = new Date(item.createdAt).toLocaleString();


    return (
        <Box
            className="stripe__post"
            sx={{
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: '#e7fe50'
            }}
        >

            <Box sx={{
                display: "flex",
                gap: '5px'
            }}>
                <Box sx={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'grey',
                    borderRadius: '100%'
                }}></Box>

                <Box>
                    <div> <b>{item.user.username}</b></div>
                    <p>
                        {/* Description:{" "} */}
                        {item.description.length > 100
                            ? item.description.slice(0, 100)
                            : item.description}
                    </p>
                    <img src={item.imageUrl} alt="image unavailable" style={{ maxWidth: "400px", borderRadius: "8px" }} />
                    <div>{formattedDate}</div>
                    <p>Comments: {item.commentCount}</p>
                    {/* <Box sx={{
                        display: 'flex',
                        gap: '5px',
                        marginTop: '10px'
                    }}>
                        {item.commentCount > 0
                            ? <div style={{ display: 'flex', gap: '5px' }}>
                                <span onClick={() => onShowComments(item.id)}
                                    style={{ cursor: 'pointer' }}>
                                    <CommentIcon width='18px' />
                                </span>
                                <span>{item.commentCount}</span>
                            </div>
                            : <div style={{ display: 'flex', gap: '5px' }}>
                                <span style={{ cursor: 'pointer' }}>
                                    <CommentIcon width='18px' />
                                </span>
                                <span>{item.commentCount}</span>
                            </div>}
                    </Box> */}


                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Box sx={{
                    display: 'flex',
                    gap: '10px'
                }}>
                    {item.commentCount > 0
                        ? <Button variant="contained" onClick={() => onShowComments(item.id)}>
                            {comments.length > 0 ? 'close comments' : 'show comments'}
                        </Button>
                        : null
                    }

                    {(user?.id === item.user?.id || user?.isAdmin) && (
                        <Button variant="contained" color="error" onClick={() => handleDeletePost(item.id)}>Delete</Button>
                    )}
                </Box>
            </Box>


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
                    : null}

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

        </Box>
    );
};

export default PostUI;