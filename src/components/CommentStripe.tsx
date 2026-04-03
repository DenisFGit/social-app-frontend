import Comment from "./Comment";
import { Box } from "@mui/material";
import type { CommentInterface } from "../store/slices/commentSlice";
import type { User } from "../store/slices/userSlice";

interface Props {
    comments: CommentInterface[];
    handleDeleteComment: (postId: number, commentId: number) => void,
    user: User | null,
    itemId: number
}

const CommentStripe = ({ comments, handleDeleteComment, user, itemId }: Props) => {

    return (
        <Box sx={{
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
        }}>
            {comments.map((comment) => (
                <Comment key={comment.id}
                    comment={comment}
                    handleDeleteComment={handleDeleteComment}
                    user={user}
                    itemId={itemId} />
            ))}
        </Box>
    );
}

export default CommentStripe;