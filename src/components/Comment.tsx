import { Box, Button, Avatar } from "@mui/material"
import type { User } from '../store/slices/userSlice';

interface Props {
    comment: {
        id: number,
        createdAt: string,
        text: string,
        user: User
    },
    user: User | null,
    itemId: number,
    handleDeleteComment: (postId: number, commentId: number) => void,
}

const Comment = ({ comment, handleDeleteComment, user, itemId }: Props) => {

    const formattedDate = new Date(comment.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (

        <Box sx={{
            bgcolor: 'pink',
            padding: '8px',
            borderRadius: '8px',
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box>
                    <Box sx={{
                        display: 'flex',
                        gap: '5px'
                    }}>
                        <Avatar>{comment.user.username[0].toUpperCase()} </Avatar>
                        <Box>
                            <p> <b>{comment.user.username}</b></p>
                            <p>{comment.text}</p>
                        </Box>
                    </Box>
                    <p>{formattedDate}</p>
                </Box>
                {user?.id === comment.user.id
                    ? <Button variant="contained" color="error"
                        onClick={() => handleDeleteComment(itemId, comment.id)}>
                        Delete
                    </Button>
                    : null
                }
            </Box>
        </Box>
    )
}

export default Comment