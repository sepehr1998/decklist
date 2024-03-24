import Box from "@mui/material/Box";
import {Modal as MaterialUIModal, Fade, Button} from '@mui/material';
import { Hero } from '../../types';
import { modalStyle } from "./modal.material.styles.ts";
import './modal.styles.scss'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    hero: Hero | null;
}

function createData(
    key: string,
    value: string,
) {
    return { key, value };
}




const Modal: React.FC<ModalProps> = ({ isOpen, onClose, hero }) => {
    const BASE_URL = 'https://ringsdb.com/';

    const rows = [
        createData('ID', hero?.code),
        createData('Name', hero?.name),
        createData('Traits', hero?.traits),
        createData('Pack Name', hero?.pack_name),
    ];

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
                            <div className="hero-image-container">
                                <img src={`${BASE_URL}${hero?.imagesrc}`} alt={hero?.name} style={{ height: '100%' }}/>
                            </div>
                            <div className="hero-details">
                                <div>
                                    <h2>
                                        {hero?.name}
                                    </h2>
                                </div>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 400 }}>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.key}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row" style={{ width: '30%' }}>{row.key}</TableCell>
                                                    <TableCell component="th" align="right" style={{ width: '70%' }}>{row.value}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <Box sx={{ marginTop: "1rem" }}>
                                <Button variant='contained' onClick={onClose}>Close</Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Fade>
        </MaterialUIModal>
    );
};

export default Modal;
