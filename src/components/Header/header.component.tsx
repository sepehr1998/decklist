// @ts-ignore
import SearchBar from '../Search Bar/searchbar.component.tsx';
import IconButton from '@mui/material/IconButton';
import GridIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/ViewList';

import './header.styles.scss.css'

interface HeaderProps {
    deckName: string;
    onDeckFetch: (data: any) => void;
    onViewModeChange: (mode: 'grid' | 'list') => void;
    setLoading: (loading: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ deckName, onDeckFetch, onViewModeChange, setLoading }) => {
    return (
        <div className="header-container">
            <div>Deck Name: {deckName}</div>
            <SearchBar onDeckFetch={onDeckFetch} setLoading={setLoading}/>
            <div className="layout-selector">
                <IconButton type="button" sx={{ p: '10px' }} aria-label="grid" onClick={() => onViewModeChange('grid')}>
                    <GridIcon />
                </IconButton>
                <IconButton type="button" sx={{ p: '10px' }} aria-label="list" onClick={() => onViewModeChange('list')}>
                    <ListIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default Header;