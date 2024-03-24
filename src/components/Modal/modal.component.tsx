// src/components/Modal.tsx
import Box from "@mui/material/Box";
import { Modal as MaterialUIModal, Backdrop, Fade, Typography, Button } from '@mui/material';
import { Hero } from '../../types';
import { modalStyle } from "./modal.material.styles.ts";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    hero: Hero | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, hero }) => {

    return (
        <MaterialUIModal
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={isOpen}>
                <Box sx={{ ...modalStyle}}
                >
                    {hero && (
                        <>
                            <Typography variant="h4">{hero.name}</Typography>
                            <Typography variant="body1">Hero ID: {hero.id}</Typography>
                            {/* Add more details about the hero here */}
                            <Button onClick={onClose}>Close</Button>
                        </>
                    )}
                </Box>
            </Fade>
        </MaterialUIModal>
    );
};

export default Modal;
