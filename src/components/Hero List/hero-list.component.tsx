import { useEffect, useState } from 'react';
import './hero-list.styles.scss.css';
import Modal from '../Modal/modal.component.tsx';
import { fetchHeroDetails } from '../../utils/utils.tsx';
import { Hero } from '../../types';
import Card from "../Card/card.component.tsx";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';

import {Button} from "@mui/material";


interface HeroListProps {
    heroes: Hero[];
    viewMode: string;
}

const HeroList: React.FC<HeroListProps> = ({ heroes, viewMode }) => {
    const [heroDetails, setHeroDetails] = useState<Hero[]>([]);
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            const details = await Promise.all(heroes.map(hero => fetchHeroDetails(hero.id)));
            setHeroDetails(details);
        };

        fetchDetails();
    }, [heroes]);

    const openModal = (hero: Hero) => {
        setSelectedHero(hero);
    };

    const closeModal = () => {
        setSelectedHero(null);
    };

    return (
        <div>
            {viewMode === 'list' ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="right">More Information</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {heroDetails.map((hero, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" style={{ width: '30%' }}>{hero?.code}</TableCell>
                                        <TableCell component="th" align="left" style={{ width: '70%' }}>{hero?.name}</TableCell>
                                        <TableCell component="th" align="right" style={{ width: '70%' }}>
                                            <Button variant="contained" onClick={() => openModal(hero)}>Info</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            ) : (
                <div className="card-container">
                    {heroDetails.map((hero, index) => (
                        <Card key={index} hero={hero} onShowMore={() => openModal(hero)} />
                    ))}
                </div>
            )}
            {selectedHero && <Modal isOpen={true} onClose={closeModal} hero={selectedHero} />}
        </div>
    );
};

export default HeroList;
