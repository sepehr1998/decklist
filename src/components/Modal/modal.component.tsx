import React from "react";
import Box from "@mui/material/Box";
import {Modal as MaterialUIModal, Fade} from '@mui/material';
import { Hero } from '../../types';
import { modalStyle } from "./modal.material.styles";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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
    value: string | undefined,
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
        createData('Sphere Name', hero?.sphere_name),
        createData('Attack, Defense, Health', `${hero?.attack}, ${hero?.defense}, ${hero?.health}`),
    ];

    return (
        <MaterialUIModal
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={isOpen}>
                <Box sx={modalStyle}>
                    {hero && (
                        <div className="modal-content">
                            <div className="hero-image-container">
                                <img src={`${BASE_URL}${hero?.imagesrc}`} alt={hero?.name}/>
                            </div>
                            <div className="hero-details">
                                <div className='hero-name'>
                                    <h2>
                                        {hero?.name}
                                    </h2>
                                </div>
                                {/*Hero Info Table*/}
                                <Paper sx={{ width: '100%' }}>
                                    <TableContainer>
                                        <Table>
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
                                </Paper>
                            </div>
                            <div className="close-button">
                                <IconButton aria-label="close-button" type="button" onClick={onClose}>
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                        </div>
                    )}
                </Box>
            </Fade>
        </MaterialUIModal>
    );
};

export default Modal;
