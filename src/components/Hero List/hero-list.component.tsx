import React, { useEffect, useState } from 'react';
import Modal from '../Modal/modal.component.tsx';
import { fetchHeroDetails } from '../../utils/utils.tsx';
import { Hero } from '../../types';
import Card from "../Card/card.component.tsx";
import HeroPropIndicator from "../Hero Prop Indicator/hero-prop-indicator.component.tsx";
import CustomAlert from "../Alert/alert.component.tsx";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import {Button} from "@mui/material";

import './hero-list.styles.scss';
import { tableCellHeader, tableCell } from "./hero-list.tableStyles.ts";
import {useLoading} from "../../contexts/loading.context.tsx";

interface HeroListProps {
    heroes: Hero[];
    viewMode: string;
}

const HeroList: React.FC<HeroListProps> = ({ heroes, viewMode }) => {
    const [heroDetails, setHeroDetails] = useState<Hero[]>([]);
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
    const [alert, setAlert] = useState<string>('');
    const { setLoading } = useLoading();

    const addAlert = (message: string) => {
        setAlert(message);
        // Remove the alert after 3 seconds
        setTimeout(() => {
            setAlert('');
        }, 4000);
    };

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const details = await Promise.all(heroes.map(hero => fetchHeroDetails(hero.id)));
                const mappedDetails: Hero[] = details.map(detail => ({
                    ...(detail as Hero)}));
                setHeroDetails(mappedDetails);
            } catch (error) {
                addAlert(`Failed to fetch hero details: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [heroes, setLoading]);

    const openModal = (hero: Hero) => {
        setSelectedHero(hero);
    };

    const closeModal = () => {
        setSelectedHero(null);
    };

    return (
        <div>
            {alert && <CustomAlert alert={alert} />}
            {viewMode === 'list' ? (
                <Paper>
                    <TableContainer>
                        <Table sx={{ minWidth: 400 }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'black' }}>
                                    <TableCell align="left" sx={tableCellHeader}>Name</TableCell>
                                    <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                    <TableCell align="center" sx={tableCellHeader}>Attack</TableCell>
                                    <TableCell align="center" sx={tableCellHeader}>Defense</TableCell>
                                    <TableCell align="center" sx={tableCellHeader}>Health</TableCell>
                                    <TableCell align="right" sx={tableCellHeader}>More Information</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {heroDetails.map((hero, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" align="left" style={tableCell}>
                                            {hero?.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" style={tableCell}>
                                            {hero?.code}
                                        </TableCell>
                                        <TableCell component="th" align="center" style={tableCell}>
                                            <HeroPropIndicator value={hero.attack} color="error"/>
                                        </TableCell>
                                        <TableCell component="th" align="center" style={tableCell}>
                                            <HeroPropIndicator value={hero.defense} color="warning"/>
                                        </TableCell>
                                        <TableCell component="th" align="center" style={tableCell}>
                                            <HeroPropIndicator value={hero.health} color="success"/>
                                        </TableCell>
                                        <TableCell component="th" align="right" style={{ width: '25%' }}>
                                            <Button variant="contained" onClick={() => openModal(hero)}>Info</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            ) : (
                <div className="cards-container">
                    {heroDetails.map((hero, index) => (
                        <div className='card-container'>
                            <Card key={index} hero={hero} onShowMore={() => openModal(hero)} />
                        </div>
                    ))}
                </div>
            )}
            {selectedHero && <Modal isOpen={true} onClose={closeModal} hero={selectedHero} />}
        </div>
    );
};

export default HeroList;
