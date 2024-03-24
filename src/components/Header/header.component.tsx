// @ts-ignore
import SearchBar from '../Search Bar/searchbar.component.tsx';
import './header.styles.scss.css'

interface HeaderProps {
    deckName: string;
    onDeckFetch: (data: any) => void;
}

const Header: React.FC<HeaderProps> = ({ deckName, onDeckFetch }) => {
    return (
        <div className="header-container">
            <div>Deck Name: {deckName}</div>
            <SearchBar onDeckFetch={onDeckFetch} />
        </div>
    );
};

export default Header;