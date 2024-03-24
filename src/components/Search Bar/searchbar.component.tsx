import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
// @ts-ignore
import { fetchDeckById } from '../../utils/utils.tsx';

interface SearchBarProps {
    onDeckFetch: (data: any) => void;
    visible?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onDeckFetch, visible = true }) => {
    const [deckId, setDeckId] = useState('');

    const handleSearch = async () => {
        try {
            const data = await fetchDeckById(deckId);
            const heroesArray = Object.keys(data.heroes).map((heroId) => ({
                id: heroId,
                quantity: data.heroes[heroId]
            }));
            onDeckFetch({ name: data.name, heroes: heroesArray }); // Convert heroes to array before passing
            setDeckId('');
        } catch (error) {
            console.error('Error fetching deck:', error);
        }
    };

    return (
        <>
            {visible && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Enter Deck Id"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={(e) => setDeckId(e.target.value)}
                            value={deckId}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
            )}
        </>
    );
};

export default SearchBar;
