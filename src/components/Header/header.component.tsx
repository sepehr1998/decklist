import React from "react";
import SearchBar from '../Search Bar/searchbar.component.tsx';
import IconButton from '@mui/material/IconButton';
import GridIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/ViewList';
import './header.styles.scss'
import {Tooltip} from "@mui/material";

interface HeaderProps {
    deckName: string;
    onDeckFetch: (data: any) => void;
    onViewModeChange: (mode: 'grid' | 'list') => void;
}

const Header: React.FC<HeaderProps> = ({ deckName, onDeckFetch, onViewModeChange }) => {
    return (
        <div className="header-container">
            <div className="deck-name">Deck Name: {deckName}</div>
            <SearchBar onDeckFetch={onDeckFetch}/>
            <div className="layout-selector">
                <Tooltip title="Card View" arrow>
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="grid" onClick={() => onViewModeChange('grid')}>
                        <GridIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="List View" arrow>
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="list" onClick={() => onViewModeChange('list')}>
                        <ListIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
};

export default Header;