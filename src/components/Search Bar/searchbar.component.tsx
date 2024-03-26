import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { fetchDeckById } from '../../utils/utils';
import CustomAlert from "../Alert/alert.component";
import {useLoading} from "../../contexts/loading.context";

interface SearchBarProps {
    onDeckFetch: (data: any) => void;
    visible?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onDeckFetch, visible = true }) => {
    const [deckId, setDeckId] = useState('');
    const [alert, setAlert] = useState<string>('');
    const { setLoading } = useLoading();

    const addAlert = (message: string) => {
        setAlert(message);
        // Remove the alert after 4 seconds
        setTimeout(() => {
            setAlert('');
        }, 4000);
    };

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            const data = await fetchDeckById(deckId);
            const heroesArray = Object.keys(data.heroes).map((heroId) => ({
                id: heroId,
                quantity: data.heroes[heroId]
            }));
            onDeckFetch({ name: data.name, heroes: heroesArray }); // Convert heroes to array before passing
            setDeckId('');
        } catch (error) {
            addAlert(`Fetching deck unsuccessful: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    };

    return (
        <>
            {alert && <CustomAlert alert={alert} />}
            {visible && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                        onSubmit={handleSearch}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            aria-label='search-input'
                            placeholder="Enter Deck Id"
                            inputProps={{ 'aria-label': 'search deck id' }}
                            onChange={(e) => setDeckId(e.target.value)}
                            value={deckId}
                            onKeyPress={handleKeyPress}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search-button">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
            )}
        </>
    );
};

export default SearchBar;
