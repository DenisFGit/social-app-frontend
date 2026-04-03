import { Box, Button, Stack, Typography } from "@mui/material";

interface ModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const Modal = ({ onConfirm, onCancel }: ModalProps) => {
    return (
        <Box style={{
            backgroundColor: 'whitesmoke',
            minWidth: 300,
            padding: '15px',
            borderRadius: '8px',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)'
        }}>
            <Typography sx={{
                textAlign: 'center'
            }}>
                Delete post?
            </Typography>
            <Stack direction='row' spacing={2} sx={{ marginTop: '15px', justifyContent: 'center' }}>
                <Button style={{ backgroundColor: 'green', color: '#ffff' }} onClick={onConfirm}>
                    Delete
                </Button>
                <Button style={{ backgroundColor: 'red', color: '#ffff' }} onClick={onCancel}>
                    Cancel
                </Button>
            </Stack>
        </Box>
    )
}

export default Modal;