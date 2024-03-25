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
    setLoading: (loading: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onDeckFetch, visible = true, setLoading }) => {
    const [deckId, setDeckId] = useState('');

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
            console.error('Error fetching deck:', error);
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
            {visible && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        onSubmit={handleSearch}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Enter Deck Id"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={(e) => setDeckId(e.target.value)}
                            value={deckId}
                            onKeyPress={handleKeyPress}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>
            )}
        </>
    );
};

export default SearchBar;
